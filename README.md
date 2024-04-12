![mytodo-logo](https://user-images.githubusercontent.com/43317360/161442742-20ff9895-c974-4328-a3ae-16aae5912398.png)

# myTodo

React Todo-List App with Firebase v9 Authentication and Firestore.

## Preview

![mytodo-preview](https://user-images.githubusercontent.com/43317360/161442246-fc0a42c7-681e-4414-a4d8-7dbdcf3a33a3.gif)

## Features

- Signup, Login, and Logout
- User Display Name
- Add, Delete, and Mark as Complete
- Firebase Authentication
- Firebase Firestore
- [tsParticles Background](https://particles.js.org/)
- [Framer Motion - animations](https://www.framer.com/motion/)

## Installation

First, download or clone this repo, and then run the command given below to install all the required dependencies.

```bash
  npm install
```

## Firebase Configuration

### Create a Firebase project

1. In the [Firebase console](https://console.firebase.google.com/), click **Add project**.

- To add Firebase resources to an existing Google Cloud project, enter its project name or select it from the dropdown menu.
- To create a new project, enter the desired project name. You can also optionally edit the project ID displayed below the project name.

2. If prompted, review and accept the [Firebase terms](https://firebase.google.com/terms).

3. Click **Continue**.

4. (_Optional_) Set up Google Analytics for your project.

5. Click **Create project** (or **Add Firebase**, if you're using an existing Google Cloud project).

### Register your app

1. In the center of the [Firebase console's project overview page](https://console.firebase.google.com/), click the **Web** icon (**</>**) to launch the setup workflow.
   If you've already added an app to your Firebase project, click **Add app** to display the platform options.

2. Enter your app's nickname.
   This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.

3. Click **Register app**.

4. Copy the **firebaseConfig** object from **Add Firebase SDK** on-screen instructions. <br/>
   Example:

```
const firebaseConfig = {
  //...
};
```

5. Replace the **firebaseConfig** object with the one given inside `src/firebase/config.js`.

### Firebase Authentication & Firestore

You also need to enable authentication and firestore services. You can directly do this from your firebase [Project Overview](https://console.firebase.google.com/) tab.
Or, follow this official documentations:

- Authentication - [Guide](https://firebase.google.com/docs/auth/web/start).
- Firestore - [Guide](https://firebase.google.com/docs/firestore/quickstart).

### Firebase Project ID

1. Goto [Project settings](https://console.firebase.google.com/project/_/settings/general/) and copy the **Project ID** from the top section.
2. Replace the **Project ID** with the one given inside `/.firebaserc` file. <br/>
   Example:

```
{
  "projects": {
    "default": "mytodo-b0609"
  }
}
```

above **mytodo-b0609** is the Project ID.

## Authors

- [@helloukey](https://www.github.com/helloukey)

## License

[MIT](LICENSE)
