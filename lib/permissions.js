// check that the userId specified owns the documents
ownsItem = function(userId, item) {
  return item && item.userId === userId;
}