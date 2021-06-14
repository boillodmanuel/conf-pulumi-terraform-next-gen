import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";


// ORIGINAL

new aws.iam.User('user-bob', {
    name: 'bob',
})


// SOLUTION

function validateUsername(username: string): string {
  if (!username.startsWith('user-')) {
    throw new Error(`Error: username ${username} should start with 'user-'`)
  }
  return username
}


new aws.iam.User('user-bob', {
    name: validateUsername('bob'),
})

// SOLUTION 2

function createUser(username: string): aws.iam.User {
  validateUsername(username)

  return new aws.iam.User(username, {
      name: username,
  })
}

createUser('bob')
createUser('joe')
