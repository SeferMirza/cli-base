# CLI Base

The most basic CLI and Command system for internal cli apps.

Create commands and let `Cli` manages main program flow;

```javascript
const cli = Cli.new([
  Command.new("hello", async name => {
    console.log(`hello ${name}`);
  }, [ question.text("name") ])
]);

await cli.run();
```

You can make use of command line arguments as well;

```bash
npm start -- hello --name John
```
