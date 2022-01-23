const { findOne } = require("./User");
const User = require("./User");


const stringToJson = (message, string, message2, string2) => {
    return JSON.stringify({ [message]: string, [message2]: string2 });
  };

  const getUserIndex =(userId) => {
    const users = loadUsers();
    const index = users.findIndex((user) => {
        if (user.id === userId){
            return true
        }
        else {
            return false
        }
    })
    return index;
  }

const addUser = async (body) => {
    const userExist = await User.findOne({_id: body._id})
    if(userExist) {
        throw Error('The user is already exist');
    }
  const user = new User(body)
  await user.save()
    return user;
}


const deleteUser = async (userId) => {
   const user = await User.deleteOne({_id: userId})
    if(!user) {
        throw Error('User not found');
    }
    // saveUsers(updatedUsers)
}

const depositCash = async (userId, cashAmount) => {
    const user = await User.findOne({_id: userId})
    if(!user){
        const e = new Error('User not found')
        e.status = 404
        throw e;
    }
    
    user.cash += cashAmount
    await user.save()
    return user
}   

const withdrawCash = (userId, cashAmount) => {
    const user = await User.findOne({_id: userId})
    if(!user){
        const e = new Error('User not found')
        e.status = 404
        throw e;
    }
    
    user.cash -= cashAmount
    await user.save()
    return user
}   


const transferCash = (userId, cashAmount, targetId) => {
    const users = loadUsers();
    const index = getUserIndex(userId);
    if(index === -1){
        throw Error('Transferring user not found'); 
    }

    const targetIndex = getUserIndex(targetId);
    if(targetIndex === -1){
        throw Error('Target user not found'); 
    }
    if( users[index].cash + users[index].credit < cashAmount ){
        throw Error('User Does not have enough credit to make the transfer')
    }
    users[targetIndex].cash += cashAmount;
    users[index].cash -= cashAmount;
    // saveUsers(users)
}



module.exports = {
    addUser,
    deleteUser,
    depositCash,
    transferCash,
    withdrawCash
}