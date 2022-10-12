# Electron App with Amplify
Uploads images using AWS Amplify and packages into a portable Electron app


## Package/Build
```bash
npm run package
```

The default build supplied by [this sample app](https://github.com/electron-react-boilerplate/electron-react-boilerplate) pushes the ready-to-go product to `release/build/<system>/ElectronReact.app`


## Debug (Mac specific)
```bash
lldb release/build/mac-arm64/ElectronReact.app

# in debugger that opens (lldb$)
run --remote-debugging-port=8315
```
Open chrome at `http://localhost:8315/`