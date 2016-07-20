var name = decodeURIComponent(window.location.search.substring(1)) || '';
name = name.replace(/</g, '&lt;').replace(/>/g, '&gt;')
document.write('Hello' + name);
