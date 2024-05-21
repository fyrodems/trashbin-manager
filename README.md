# Documentation of the Wastebin System Website

[Link to the app](http://46.242.130.6:3012/login)

[Dokumentacja po polsku](https://github.com/fyrodems/trashbin-manager/blob/main/documentationPL.md)

## Table of Contents

1. [Application Description](#application-description)
2. [Functionality Description](#functionality-description)
3. [Login Data](#login-data)

## Application Description

The "Wastebin System" application is a comprehensive tool dedicated to managing the system of wastebin shelters. It is an online platform that facilitates interaction between various entities, such as individual users, officials, companies, housing cooperatives, and administrators.

The entire system operates based on municipalities. Individual users are assigned to municipalities. Then, officials, superOfficials, and admins from a specific municipality can manage user accounts. Companies and cooperatives are almost autonomous entities.

Access to wastebin shelters is possible via access cards.

The application ensures secure login, access control to data, and a user interface designed to be intuitive and user-friendly. This allows all involved parties to efficiently manage the system of wastebin shelters, monitor statistics, and take appropriate actions to maintain order and effectively manage waste.

## Functionality Description

### Individual User

- Can view their own waste disposal records, wastebin shelter access cards, agreements, profile data, and the history of submitted applications.
- Cannot add cards/agreements on their own - everything is sent to the appropriate municipality, where it must be confirmed by an official.
- Can only block a card, cancel an application, and change email, phone number, and password.

### Official

- Accepts or rejects user applications.
- Can search for all users residing in their municipality or having at least one of their addresses there.
- Can edit user data and block accounts.
- Has a view of the wastebin shelters in the municipality along with the list of assigned agreements.

### SuperOfficial

- Has the same permissions as an official.
- Additionally, can create new official accounts in their municipality.

### Company

- In addition to viewing statistics and its own data, it also has a view of its wastebin shelters and access cards.
- Can change its data and assign access to its wastebin shelters to the held cards.
- Can apply for a package of new cards.

### Housing Cooperative

- Similar to a company but additionally can assign its tenants to itself.
- Has its own cards, which it lends to its tenants.

### Administrator

- Can add wastebin shelters to the system and assign them to specific entities.
- Creates superOfficial accounts and approves requests for card packages.

## Login Data

All accounts have the password: qqqqqqq1

**User Logins:**

- Individual user: uzytkownik@kratki.com
- Official: urzednik@kratki.com
- SuperOfficial: superurzednik@kratki.com
- Company: firma@kratki.com
- Housing Cooperative: spoldzielnia@kratki.com
