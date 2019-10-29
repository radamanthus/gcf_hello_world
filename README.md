I created this project to explore how to create a file in a Google Cloud Storage bucket.

When you hit the http endpoint, it creates a text file in a bucket.

My main takeaways are:
- Add the `@google-cloud/storage` package
- Initialize the handle to the bucket like so: https://github.com/radamanthus/gcf_hello_world/blob/master/index.js#L15-L20
- Create a file and a stream: https://github.com/radamanthus/gcf_hello_world/blob/master/index.js#L25-L31
- Handle errors: https://github.com/radamanthus/gcf_hello_world/blob/master/index.js#L33-L37
- Write to the stream - it's a normal Node.js Writable stream: https://github.com/radamanthus/gcf_hello_world/blob/master/index.js#L44-L46
- Close the stream when you're done: https://github.com/radamanthus/gcf_hello_world/blob/master/index.js#L47
