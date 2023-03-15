pub contract TasksOld {
// declare user
pub var usersArray: [User]
init() {
  self.usersArray = []
}

// Define the user struct
  pub struct User {
    pub let walletAddress: String
    pub let name: String
    pub var points: Int
    pub var numOfTasks: Int
    pub var arrayOfBountiesCompleted: [String]

    init(walletAddress: String, name:String, points: Int, numOfTasks: Int, arrayOfBountiesCompleted:Int) {
        self.walletAddress = walletAddress
        self.name = name
        self.points = points
        self.numOfTasks = numOfTasks
        self.arrayOfBountiesCompleted=[]
    }
}

// Create a new User
   pub fun createUser(name:String, points: Int, arrayOfBountiesCompleted:Int):@User {
    usersArray.append(create User(name:String, points: Int, arrayOfBountiesCompleted:Int))
}










  // Define the users dictionary
/*  pub var users: {String: User}

  init(users : Int){
  self.users={}
  }
      //- function that creates a task(takes: id, owner, & CID)

   //- function that createUserProfile(takes: walletaddress, points=0, bountiesNum=0, arrayOfBountiesByID=[])
    pub resource user {
        pub let walletAddress: String
        pub let name: String
        pub var points: Int
        pub var numOfTasks: Int
        pub var arrayOfBountiesCompleted: [String]

        init(walletAddress: String, name:String, points: Int, numOfTasks: Int, arrayOfBountiesCompleted:Int) {
            self.walletAddress = walletAddress
            self.name = name
            self.points = points
            self.numOfTasks = numOfTasks
            self.arrayOfBountiesCompleted=[]
        }

        // Create a new user
        pub fun createUser(walletAddress: String, name:String, points:Int, numOfTasks:Int,
        arrayOfBountiesCompleted: Int): @user {
            return <-create user(walletAddress: walletAddress, name:name, points: points, numOfTasks:numOfTasks, arrayOfBountiesCompleted:arrayOfBountiesCompleted )
        }

   //- function to updatePoints(takes: walletaddress, pointsToAdd) then increase bountiesNum+1  & then push  to arrayOfBountiesByID(take: bountyID)
        pub fun updateUser(points:Int, cid:String) {
            self.points=self.points + points
            self.numOfTasks=self.numOfTasks+1
            self.arrayOfBountiesCompleted.append(cid)
        }
    }

    // now I need to create an array of users

  */




}
