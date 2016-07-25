var p = showModalDialog(
            '3d-point-entry.html',
            ['Enter 3D point coordinates', 'x', 'y', 'z'],
            'dialogwidth:400; dialogheight:300; resizeable:yes'
        );
console.log('return value', window.getModalDialogReturn());