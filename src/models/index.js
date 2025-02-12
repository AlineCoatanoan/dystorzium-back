// models/index.js
import User from './userModel';
import Action from './actionModel';
import User_Action from './userActionModel';
import Riddle from './riddleModel';
import Clue from './clueModel';
import User_Clue from './userClueModel';
import User_Riddle from './userRiddleModel';

// Associer les modèles entre eux
User.hasMany(Action, { foreignKey: 'user_id' });
Action.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(User_Action, { foreignKey: 'user_id' });
Action.hasMany(User_Action, { foreignKey: 'action_id' });
User_Action.belongsTo(User, { foreignKey: 'user_id' });
User_Action.belongsTo(Action, { foreignKey: 'action_id' });

Riddle.hasMany(Action, { foreignKey: 'riddle_id' });
Action.belongsTo(Riddle, { foreignKey: 'riddle_id' });

User.hasMany(User_Riddle, { foreignKey: 'user_id' });
Riddle.hasMany(User_Riddle, { foreignKey: 'riddle_id' });
User_Riddle.belongsTo(User, { foreignKey: 'user_id' });
User_Riddle.belongsTo(Riddle, { foreignKey: 'riddle_id' });

Riddle.hasMany(Clue, { foreignKey: 'riddle_id' });
Clue.belongsTo(Riddle, { foreignKey: 'riddle_id' });

User.hasMany(User_Clue, { foreignKey: 'user_id' });
Clue.hasMany(User_Clue, { foreignKey: 'clue_id' });
User_Clue.belongsTo(User, { foreignKey: 'user_id' });
User_Clue.belongsTo(Clue, { foreignKey: 'clue_id' });

export { User, Action, User_Action, Riddle, Clue, User_Clue, User_Riddle };
