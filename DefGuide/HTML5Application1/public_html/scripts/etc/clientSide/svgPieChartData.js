whenReady(function(){
    document.body.appendChild(pieChart({
        data: [12, 23, 34, 45],
        colors: ['red', 'blue', 'yellow', 'green'],
        labels: ['North', 'South', 'East', 'West']
    }));
});