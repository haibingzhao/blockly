/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Components for creating connections between blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Connection');

goog.require('goog.asserts');
goog.require('goog.dom');


/**
 * Class for a connection between blocks.
 * @param {!Blockly.Block} source The block establishing this connection.
 * @param {number} type The type of the connection.
 * @constructor
 */
Blockly.Connection = function(source, type) {
  /**
   * @type {!Blockly.Block}
   * @private
   */
  this.sourceBlock_ = source;
  /** @type {number} */
  this.type = type;
  // Shortcut for the databases for this connection's workspace.
  if (source.workspace.connectionDBList) {
    this.db_ = source.workspace.connectionDBList[type];
    this.dbOpposite_ =
        source.workspace.connectionDBList[Blockly.OPPOSITE_TYPE[type]];
    this.hidden_ = !this.db_;
  }
};

/**
 * Constants for checking whether two connections are compatible.
 */
Blockly.Connection.CAN_CONNECT = 0;
Blockly.Connection.REASON_SELF_CONNECTION = 1;
Blockly.Connection.REASON_WRONG_TYPE = 2;
Blockly.Connection.REASON_TARGET_NULL = 3;
Blockly.Connection.REASON_CHECKS_FAILED = 4;
Blockly.Connection.REASON_DIFFERENT_WORKSPACES = 5;
Blockly.Connection.REASON_SHADOW_PARENT = 6;

/**
 * Connection this connection connects to.  Null if not connected.
 * @type {Blockly.Connection}
 */
Blockly.Connection.prototype.targetConnection = null;

/**
 * List of compatible value types.  Null if all types are compatible.
 * @type {Array}
 * @private
 */
Blockly.Connection.prototype.check_ = null;

/**
 * DOM representation of a shadow block, or null if none.
 * @type {Element}
 * @private
 */
Blockly.Connection.prototype.shadowDom_ = null;

/**
 * Horizontal location of this connection.
 * @type {number}
 * @private
 */
Blockly.Connection.prototype.x_ = 0;

/**
 * Vertical location of this connection.
 * @type {number}
 * @private
 */
Blockly.Connection.prototype.y_ = 0;

/**
 * Has this connection been added to the connection database?
 * @type {boolean}
 * @private
 */
Blockly.Connection.prototype.inDB_ = false;

/**
 * Connection database for connections of this type on the current workspace.
 * @type {Blockly.ConnectionDB}
 * @private
 */
Blockly.Connection.prototype.db_ = null;

/**
 * Connection database for connections compatible with this type on the
 * current workspace.
 * @type {Blockly.ConnectionDB}
 * @private
 */
Blockly.Connection.prototype.dbOpposite_ = null;

/**
 * Whether this connections is hidden (not tracked in a database) or not.
 * @type {boolean}
 * @private
 */
Blockly.Connection.prototype.hidden_ = null;

/**
 * Connect two connections together.  This is the connection on the superior
 * block.
 * @param {!Blockly.Connection} childConnection Connection on inferior block.
 * @private
 */
Blockly.Connection.prototype.connect_ = function(childConnection) {
  var parentConnection = this;
  var parentBlock = parentConnection.getSourceBlock();
  var childBlock = childConnection.getSourceBlock();
  // Disconnect any existing parent on the child connection.
  if (childConnection.isConnected()) {
    childConnection.disconnect();
  }
  if (parentConnection.isConnected()) {
    // Other connection is already connected to something.
    // Disconnect it and reattach it or bump it as needed.
    var orphanBlock = parentConnection.targetBlock();
    var shadowDom = parentConnection.getShadowDom();
    // Temporarily set the shadow DOM to null so it does not respawn.
    parentConnection.setShadowDom(null);
    // Displaced shadow blocks dissolve rather than reattaching or bumping.
    if (orphanBlock.isShadow()) {
      // Save the shadow block so that field values are preserved.
      shadowDom = Blockly.Xml.blockToDom(orphanBlock);
      orphanBlock.dispose();
      orphanBlock = null;
    } else if (parentConnection.type == Blockly.INPUT_VALUE) {
      // Value connections.
      // If female block is already connected, disconnect and bump the male.
      if (!orphanBlock.outputConnection) {
        throw 'Orphan block does not have an output connection.';
      }
      // Attempt to reattach the orphan at the end of the newly inserted
      // block.  Since this block may be a row, walk down to the end
      // or to the first (and only) shadow block.
      var connection = Blockly.Connection.lastConnectionInRow_(
          childBlock, orphanBlock);
      if (connection) {
        orphanBlock.outputConnection.connect(connection);
        orphanBlock = null;
      }
    } else if (parentConnection.type == Blockly.NEXT_STATEMENT) {
      // Statement connections.
      // Statement blocks may be inserted into the middle of a stack.
      // Split the stack.
      if (!orphanBlock.previousConnection) {
        throw 'Orphan block does not have a previous connection.';
      }
      // Attempt to reattach the orphan at the bottom of the newly inserted
      // block.  Since this block may be a stack, walk down to the end.
      var newBlock = childBlock;
      while (newBlock.nextConnection) {
        var nextBlock = newBlock.getNextBlock();
        if (nextBlock && !nextBlock.isShadow()) {
          newBlock = nextBlock;
        } else {
          if (orphanBlock.previousConnection.checkType_(
              newBlock.nextConnection)) {
            newBlock.nextConnection.connect(orphanBlock.previousConnection);
            orphanBlock = null;
          }
          break;
        }
      }
    }
    if (orphanBlock) {
      // Unable to reattach orphan.
      parentConnection.disconnect();
      if (Blockly.Events.recordUndo) {
        // Bump it off to the side after a moment.
        var group = Blockly.Events.getGroup();
        setTimeout(function() {
          // Verify orphan hasn't been deleted or reconnected (user on meth).
          if (orphanBlock.workspace && !orphanBlock.getParent()) {
            Blockly.Events.setGroup(group);
            if (orphanBlock.outputConnection) {
              orphanBlock.outputConnection.bumpAwayFrom_(parentConnection);
            } else if (orphanBlock.previousConnection) {
              orphanBlock.previousConnection.bumpAwayFrom_(parentConnection);
            }
            Blockly.Events.setGroup(false);
          }
        }, Blockly.BUMP_DELAY);
      }
    }
    // Restore the shadow DOM.
    parentConnection.setShadowDom(shadowDom);
  }

  var event;
  if (Blockly.Events.isEnabled()) {
    event = new Blockly.Events.Move(childBlock);
  }
  // Establish the connections.
  Blockly.Connection.connectReciprocally_(parentConnection, childConnection);
  // Demote the inferior block so that one is a child of the superior one.
  childBlock.setParent(parentBlock);
  if (event) {
    event.recordNew();
    Blockly.Events.fire(event);
  }
};

/**
 * Sever all links to this connection (not including from the source object).
 */
Blockly.Connection.prototype.dispose = function() {
  if (this.isConnected()) {
    throw 'Disconnect connection before disposing of it.';
  }
  if (this.inDB_) {
    this.db_.removeConnection_(this);
  }
  if (Blockly.highlightedConnection_ == this) {
    Blockly.highlightedConnection_ = null;
  }
  if (Blockly.localConnection_ == this) {
    Blockly.localConnection_ = null;
  }
  this.db_ = null;
  this.dbOpposite_ = null;
};

/**
 * Get the source block for this connection.
 * @return {Blockly.Block} The source block, or null if there is none.
 */
Blockly.Connection.prototype.getSourceBlock = function() {
  return this.sourceBlock_;
};

/**
 * Does the connection belong to a superior block (higher in the source stack)?
 * @return {boolean} True if connection faces down or right.
 */
Blockly.Connection.prototype.isSuperior = function() {
  return this.type == Blockly.INPUT_VALUE ||
      this.type == Blockly.NEXT_STATEMENT;
};

/**
 * Is the connection connected?
 * @return {boolean} True if connection is connected to another connection.
 */
Blockly.Connection.prototype.isConnected = function() {
  return !!this.targetConnection;
};

/**
 * Checks whether the current connection can connect with the target
 * connection.
 * @param {Blockly.Connection} target Connection to check compatibility with.
 * @return {number} Blockly.Connection.CAN_CONNECT if the connection is legal,
 *    an error code otherwise.
 * @private
 */
Blockly.Connection.prototype.canConnectWithReason_ = function(target) {
  if (!target) {
    return Blockly.Connection.REASON_TARGET_NULL;
  }
  if (this.isSuperior()) {
    var blockA = this.sourceBlock_;
    var blockB = target.getSourceBlock();
  } else {
    var blockB = this.sourceBlock_;
    var blockA = target.getSourceBlock();
  }
  if (blockA && blockA == blockB) {
    return Blockly.Connection.REASON_SELF_CONNECTION;
  } else if (target.type != Blockly.OPPOSITE_TYPE[this.type]) {
    return Blockly.Connection.REASON_WRONG_TYPE;
  } else if (blockA && blockB && blockA.workspace !== blockB.workspace) {
    return Blockly.Connection.REASON_DIFFERENT_WORKSPACES;
  } else if (!this.checkType_(target)) {
    return Blockly.Connection.REASON_CHECKS_FAILED;
  } else if (blockA.isShadow() && !blockB.isShadow()) {
    return Blockly.Connection.REASON_SHADOW_PARENT;
  }
  return Blockly.Connection.CAN_CONNECT;
};

/**
 * Checks whether the current connection and target connection are compatible
 * and throws an exception if they are not.
 * @param {Blockly.Connection} target The connection to check compatibility
 *    with.
 * @private
 */
Blockly.Connection.prototype.checkConnection_ = function(target) {
  switch (this.canConnectWithReason_(target)) {
    case Blockly.Connection.CAN_CONNECT:
      break;
    case Blockly.Connection.REASON_SELF_CONNECTION:
      throw 'Attempted to connect a block to itself.';
    case Blockly.Connection.REASON_DIFFERENT_WORKSPACES:
      // Usually this means one block has been deleted.
      throw 'Blocks not on same workspace.';
    case Blockly.Connection.REASON_WRONG_TYPE:
      throw 'Attempt to connect incompatible types.';
    case Blockly.Connection.REASON_TARGET_NULL:
      throw 'Target connection is null.';
    case Blockly.Connection.REASON_CHECKS_FAILED:
      throw 'Connection checks failed.';
    case Blockly.Connection.REASON_SHADOW_PARENT:
      throw 'Connecting non-shadow to shadow block.';
    default:
      throw 'Unknown connection failure: this should never happen!';
  }
};

/**
 * Check if the two connections can be dragged to connect to each other.
 * @param {!Blockly.Connection} candidate A nearby connection to check.
 * @return {boolean} True if the connection is allowed, false otherwise.
 */
Blockly.Connection.prototype.isConnectionAllowed = function(candidate) {
  // Type checking.
  var canConnect = this.canConnectWithReason_(candidate);
  if (canConnect != Blockly.Connection.CAN_CONNECT) {
    return false;
  }

  // Don't offer to connect an already connected left (male) value plug to
  // an available right (female) value plug.  Don't offer to connect the
  // bottom of a statement block to one that's already connected.
  if (candidate.type == Blockly.OUTPUT_VALUE ||
      candidate.type == Blockly.PREVIOUS_STATEMENT) {
    if (candidate.isConnected() || this.isConnected()) {
      return false;
    }
  }

  // Offering to connect the left (male) of a value block to an already
  // connected value pair is ok, we'll splice it in.
  // However, don't offer to splice into an immovable block.
  if (candidate.type == Blockly.INPUT_VALUE && candidate.isConnected() &&
      !candidate.targetBlock().isMovable() &&
      !candidate.targetBlock().isShadow()) {
    return false;
  }

  // Don't let a block with no next connection bump other blocks out of the
  // stack.  But covering up a shadow block or stack of shadow blocks is fine.
  // Similarly, replacing a terminal statement with another terminal statement
  // is allowed.
  if (this.type == Blockly.PREVIOUS_STATEMENT &&
      candidate.isConnected() &&
      !this.sourceBlock_.nextConnection &&
      !candidate.targetBlock().isShadow() &&
      candidate.targetBlock().nextConnection) {
    return false;
  }

  // Don't let blocks try to connect to themselves or ones they nest.
  if (Blockly.draggingConnections_.indexOf(candidate) != -1) {
    return false;
  }

  return true;
};

/**
 * Connect this connection to another connection.
 * @param {!Blockly.Connection} otherConnection Connection to connect to.
 */
Blockly.Connection.prototype.connect = function(otherConnection) {
  if (this.targetConnection == otherConnection) {
    // Already connected together.  NOP.
    return;
  }
  this.checkConnection_(otherConnection);
  // Determine which block is superior (higher in the source stack).
  if (this.isSuperior()) {
    // Superior block.
    this.connect_(otherConnection);
  } else {
    // Inferior block.
    otherConnection.connect_(this);
  }
};

/**
 * Update two connections to target each other.
 * @param {Blockly.Connection} first The first connection to update.
 * @param {Blockly.Connection} second The second conneciton to update.
 * @private
 */
Blockly.Connection.connectReciprocally_ = function(first, second) {
  goog.asserts.assert(first && second, 'Cannot connect null connections.');
  first.targetConnection = second;
  second.targetConnection = first;
};

/**
 * Does the given block have one and only one connection point that will accept
 * an orphaned block?
 * @param {!Blockly.Block} block The superior block.
 * @param {!Blockly.Block} orphanBlock The inferior block.
 * @return {Blockly.Connection} The suitable connection point on 'block',
 *     or null.
 * @private
 */
Blockly.Connection.singleConnection_ = function(block, orphanBlock) {
  var connection = false;
  for (var i = 0; i < block.inputList.length; i++) {
    var thisConnection = block.inputList[i].connection;
    if (thisConnection && thisConnection.type == Blockly.INPUT_VALUE &&
        orphanBlock.outputConnection.checkType_(thisConnection)) {
      if (connection) {
        return null;  // More than one connection.
      }
      connection = thisConnection;
    }
  }
  return connection;
};

/**
 * Walks down a row a blocks, at each stage checking if there are any
 * connections that will accept the orphaned block.  If at any point there
 * are zero or multiple eligible connections, returns null.  Otherwise
 * returns the only input on the last block in the chain.
 * Terminates early for shadow blocks.
 * @param {!Blockly.Block} startBlock The block on which to start the search.
 * @param {!Blockly.Block} orphanBlock The block that is looking for a home.
 * @return {Blockly.Connection} The suitable connection point on the chain
 *    of blocks, or null.
 * @private
 */
Blockly.Connection.lastConnectionInRow_ = function(startBlock, orphanBlock) {
  var newBlock = startBlock;
  var connection;
  while (connection = Blockly.Connection.singleConnection_(
      /** @type {!Blockly.Block} */ (newBlock), orphanBlock)) {
    // '=' is intentional in line above.
    newBlock = connection.targetBlock();
    if (!newBlock || newBlock.isShadow()) {
      return connection;
    }
  }
  return null;
};

/**
 * Disconnect this connection.
 */
Blockly.Connection.prototype.disconnect = function() {
  var otherConnection = this.targetConnection;
  goog.asserts.assert(otherConnection, 'Source connection not connected.');
  goog.asserts.assert(otherConnection.targetConnection == this,
      'Target connection not connected to source connection.');

  var parentBlock, childBlock, parentConnection;
  if (this.isSuperior()) {
    // Superior block.
    parentBlock = this.sourceBlock_;
    childBlock = otherConnection.getSourceBlock();
    parentConnection = this;
  } else {
    // Inferior block.
    parentBlock = otherConnection.getSourceBlock();
    childBlock = this.sourceBlock_;
    parentConnection = otherConnection;
  }
  this.disconnectInternal_(parentBlock, childBlock);
  parentConnection.respawnShadow_();
};

/**
 * Disconnect two blocks that are connected by this connection.
 * @param {!Blockly.Block} parentBlock The superior block.
 * @param {!Blockly.Block} childBlock The inferior block.
 * @private
 */
Blockly.Connection.prototype.disconnectInternal_ = function(parentBlock,
    childBlock) {
  var event;
  if (Blockly.Events.isEnabled()) {
    event = new Blockly.Events.Move(childBlock);
  }
  var otherConnection = this.targetConnection;
  otherConnection.targetConnection = null;
  this.targetConnection = null;
  childBlock.setParent(null);
  if (event) {
    event.recordNew();
    Blockly.Events.fire(event);
  }
};

/**
 * Respawn the shadow block if there was one connected to the this connection.
 * @private
 */
Blockly.Connection.prototype.respawnShadow_ = function() {
  var parentBlock = this.getSourceBlock();
  var shadow = this.getShadowDom();
  if (parentBlock.workspace && shadow && Blockly.Events.recordUndo) {
    var blockShadow =
        Blockly.Xml.domToBlock(shadow, parentBlock.workspace);
    if (blockShadow.outputConnection) {
      this.connect(blockShadow.outputConnection);
    } else if (blockShadow.previousConnection) {
      this.connect(blockShadow.previousConnection);
    } else {
      throw 'Child block does not have output or previous statement.';
    }
  }
};

/**
 * Returns the block that this connection connects to.
 * @return {Blockly.Block} The connected block or null if none is connected.
 */
Blockly.Connection.prototype.targetBlock = function() {
  if (this.isConnected()) {
    return this.targetConnection.getSourceBlock();
  }
  return null;
};

/**
 * Is this connection compatible with another connection with respect to the
 * value type system.  E.g. square_root("Hello") is not compatible.
 * @param {!Blockly.Connection} otherConnection Connection to compare against.
 * @return {boolean} True if the connections share a type.
 * @private
 */
Blockly.Connection.prototype.checkType_ = function(otherConnection) {
  if (!this.check_ || !otherConnection.check_) {
    // One or both sides are promiscuous enough that anything will fit.
    return true;
  }
  // Find any intersection in the check lists.
  for (var i = 0; i < this.check_.length; i++) {
    var check = this.check_[i];
    // if it's a function, return string
    if(goog.isFunction(check)){
      check = check();
    }
    // if otherConnection's check is function
    var otherCheck = otherConnection.check_;
    if(otherCheck[0] && goog.isFunction(otherCheck[0])){
      otherCheck = [otherCheck[0]()];
    }
    if (otherCheck.indexOf(check) != -1) {
      return true;
    }
  }
  // No intersection.
  return false;
};

/**
 * Change a connection's compatibility.
 * @param {*} check Compatible value type or list of value types.
 *     Null if all types are compatible.
 * @return {!Blockly.Connection} The connection being modified
 *     (to allow chaining).
 */
Blockly.Connection.prototype.setCheck = function(check) {
  if (check) {
    // Ensure that check is in an array.
    if (!goog.isArray(check)) {
      check = [check];
    }
    this.check_ = check;
    // The new value type may not be compatible with the existing connection.
    if (this.isConnected() && !this.checkType_(this.targetConnection)) {
      var child = this.isSuperior() ? this.targetBlock() : this.sourceBlock_;
      child.unplug();
      // Bump away.
      this.sourceBlock_.bumpNeighbours_();
    }
  } else {
    this.check_ = null;
  }
  return this;
};

/**
 * Change a connection's shadow block.
 * @param {Element} shadow DOM representation of a block or null.
 */
Blockly.Connection.prototype.setShadowDom = function(shadow) {
  this.shadowDom_ = shadow;
};

/**
 * Return a connection's shadow block.
 * @return {Element} shadow DOM representation of a block or null.
 */
Blockly.Connection.prototype.getShadowDom = function() {
  return this.shadowDom_;
};