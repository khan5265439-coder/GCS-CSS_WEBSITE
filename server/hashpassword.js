const bcrypt = require("bcryptjs");

// The password to hash
const password = "Khan768";

// Generate a salt
bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  // Hash the password with the salt
  bcrypt.hash(password, salt, (err, hashedPassword) => {
    if (err) throw err;

    // Print the hashed password
    console.log("Hashed Password:", hashedPassword);
  });
});
