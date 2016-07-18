importPackage(javax.swing);
importClass(javax.swing.border.EmptyBorder);
importClass(java.awt.event.ActionListener);
importClass(java.net.URL);
importClass(java.io.FileOutputStream);
importClass(java.lang.Thread);

const URL_FIELD = new JTextField(30);
const PADDING = new EmptyBorder(3,3,3,3);

var downloadBox = createDownloadBox();
var outerBox = createOuterBox(downloadBox);

var fetcherFrame = new JFrame('Rhino URL Fetcher');
	fetcherFrame.add(outerBox);
	fetcherFrame.pack();
	fetcherFrame.visible = true;
	var windowClosingListener = new java.awt.event.WindowListener({
		windowClosing: function (event, name) {
			if (name === 'windowClosing'){
				java.lang.System.exit(0);
			}
		}
	});
	fetcherFrame.addWindowListener(windowClosingListener);

// ----------------------------------------------
	
function createOuterBox(downloadBox){
	var outerBox = Box.createVerticalBox();
	outerBox.add(downloadBox);
	return outerBox;
}	
	
function createDownloadBox(){
	var downloadBox = Box.createHorizontalBox();
		downloadBox.add(URL_FIELD);

	var button = new JButton('Download');
		button.addActionListener(downloadActionListener);
	
		downloadBox.add(button);
		downloadBox.setBorder(PADDING);
	return downloadBox;

	// ----------------------------------
	
	function downloadActionListener(){
		try {
			new java.lang.Thread(function (){
				downloadFile(new URL(URL_FIELD.text), chooseFile());
			}).start();
		}
		catch(e) {
			JOptionPane.showMessageDialog(
					fetcherFrame, 
					e.message, 
					'Exception', 
					JOptionPane.ERROR_MESSAGE
					);
		}

		function chooseFile() {
			var fileChooser = new JFileChooser();
			var response = fileChooser.showSaveDialog(fetcherFrame);
			if (response !== JFileChooser.APPROVE_OPTION){
				return;
			}
			return fileChooser.getSelectedFile();
		}

		function downloadFile(url, file){
			try {
				var progressBar = createProgressBar(file);
				progressBox = createProgressBox(progressBar);
				outerBox.add(progressBox);

				fetcherFrame.pack();
				progressBar.indeterminate = true;
				
				var connection = url.openConnection();
					connection.connect();

				var length = connection.contentLength;
				if (length){
					progressBar.maximum = length;
					progressBar.indeterminate = false;
				}
				
				writeFile(connection, file, progressBar);
			}
			catch(e){
				if (progressBar){
					progressBar.indeterminate = false;
					progressBar.string = e.toString();
				}
			}
			
			// --------------------------------------------------------------

			function createProgressBox(progressBar){
				var progressBox = Box.createHorizontalBox();
				progressBox.setBorder(PADDING);
				
				var label = url.toString() + ': '; 
				progressBox.add(new JLabel(label));
				
				progressBox.add(progressBar);
				return progressBox;
			}
			
			function createProgressBar(file){
				var progressBar = new JProgressBar(0, 100);
				progressBar.stringPainted = true;
				progressBar.string = file.toString();
				return progressBar;
			}
			
			function writeFile(connection, file, progressBar){
				var input = connection.inputStream;
				var output = new FileOutputStream(file);
				var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);

				var num;
				while((num = input.read(buffer)) !== -1){
					output.write(buffer, 0, num);
					progressBar.value += num;
				}

				output.close();
				input.close();
			}
		}
	}
}

//----------------------------------------------





