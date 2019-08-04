import * as functions from 'firebase-functions';


export const WelcomeLog = functions.auth.user().onCreate((user) => {
  console.log('Hello '+ user.displayName + ' logged in'+'called by TS')
});
