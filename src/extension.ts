// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as WebRequest from 'web-request';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "vs-trans" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.vstrans', () => {
		// The code you place here will be executed every time your command is executed
		// 获取当前编辑器对象
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return false;
		}
		let text = editor.document.getText(editor.selection);
		let rawtext = text;
		if(!text) {
			// 无效的选中词要特殊处理 TODO 添加规则检测
			return false;
		}
		text = encodeURI(text);
		let url = "http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=" + text;
		// vscode.window.showInformationMessage(url);
		WebRequest.get(url).then(resp => {
			let ret = JSON.parse(resp.content);
			let transret = ret.translateResult[0][0].tgt;
			let msg = rawtext + ": " + transret;
			vscode.window.showInformationMessage(msg);
		});
		// Display a message box to the user
		//vscode.window.showInformationMessage(text);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
