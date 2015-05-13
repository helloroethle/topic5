AutoForm.addHooks(['createQuote'], {
    after: {
      insert: function(error, result) {
        if (error) {
        console.log("Insert Error:", error);
        } else {
        console.log("Insert Result:", result);
        }
      }
    }
});