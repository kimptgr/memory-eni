export async function  hachPassword(password){
    var hashedPassword = await argon2.hash({
        pass: password,
        salt: 'kimemory',
        type: argon2.ArgonType.Argon2id,
    });
    console.log("dans cryptage");
    console.log(hashedPassword.hashHex);
    return hashedPassword.hashHex;
};