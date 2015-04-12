// Local (client-only) collection
// different than session in that it persists browsers
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};