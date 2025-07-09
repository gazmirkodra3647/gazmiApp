# Security & Privacy Settings: Verify "Network details check" Toggle Functionality

# Feature: Toggle "Network details check" in Security & Privacy Settings

In order to enhance user experience
As a user of the wallet extension
I want to toggle the "Network details check" option in the Security & Privacy Settings

# Scenario: Default state of "Network details check" toggle is ON

Given I am in Settings
When I click on the "Security & Privacy" tab
Then the "Network details check" toggle is set to ON by default

# Scenario: "Network details check" toggle functionality

Given I am on the Security & Privacy settings page
And the "Network details check" toggle is initially set to ON
When I click on the "Network details check" toggle icon
Then the toggle switch should visually indicate OFF
When I click on it again
Then it should visually indicate ON

# Scenario: Verification of network details when toggle is ON

Given I am on Security & Privacy settings page with toggle set to ON 
When I navigate to Networks tab and change network name 
Then suggested name appears below 
When I change currency symbol 
Then suggested ticker appears below 

# Scenario: Verification when toggle is OFF 

Given I'm on Security & Privacy with toggle OFF 
When checking network from Networks tab and changing currency symbol 
Then message indicates verification unavailable  
