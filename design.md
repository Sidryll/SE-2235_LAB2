# Firebase Database Design

## Overview

This design uses Firebase Authentication for sign-up and login. Realtime Database or Firestore can be used to store user cards. Each authenticated user can create a card with the following structure:

- `card_id`: string
- `isAccepted`: boolean

A generated link (e.g., `https://cupyd.com/y7ey4`) will reference the card, typically by the card's unique ID.

## Authentication

- Use Firebase Authentication to manage user sign-up and login.
- Support email/password authentication.
- Upon successful login, the user's UID is used to store and reference their cards.

## Data Structure

### Firestore Example Schema

```
users (collection)
 └── {uid} (document)
  ├── profile: { ... } // additional user info
  └── cards (subcollection)
    └── {card_id} (document)
         ├── card_id: string
         └── isAccepted: boolean
```

### Realtime Database Example Schema

```
users: {
  {uid}: {
    profile: { ... },
    cards: {
  {card_id}: {
    card_id: string,
    isAccepted: boolean
  }
    }
  }
}
```

## Card Sharing via Links

- When a card is created, generate a unique `card_id`.
- Map the card to a shareable URL (e.g., `https://cupyd.com/{card_id}`).
- Use Firebase Dynamic Links to further customize and track the link sharing.

## Implementation Steps

1. **Setup Firebase Project**

   - Enable Email/Password Authentication.
   - Choose Firestore (or Realtime Database) as your database service.
   - Optionally, configure Firebase Dynamic Links.

2. **User Authentication**

   - Create forms for sign-up and login.
   - Upon successful authentication, store the user’s UID.

3. **Card Creation**

   - Allow the user to create a card with a unique `card_id`.
   - Save card information under the user's document (or node) in the database.
   - Mark `isAccepted` as needed based on application logic.

4. **Sharing Cards**
   - Generate a shareable link using the `card_id`.
   - Optionally, add Firebase Dynamic Links to shorten or track the URLs.

## Example Code Snippet: Creating a Card (Firestore)

```javascript
// Initialize Firestore
const db = firebase.firestore();

// Function to create a card
function createCard(userUid, cardData) {
  const cardRef = db
    .collection("users")
    .doc(userUid)
    .collection("cards")
    .doc(cardData.card_id);
  return cardRef
    .set(cardData)
    .then(() => console.log("Card created successfully."))
    .catch((error) => console.error("Error creating card: ", error));
}

// Example usage:
const userUid = firebase.auth().currentUser.uid;
const newCard = {
  card_id: "y7ey4",
  isAccepted: false,
};

createCard(userUid, newCard);
```
