{
    document.querySelector('#submitButton').addEventListener('click', () => {
        const textInput = document.querySelector('#textInput').value;
        const storeAChecked = document.querySelector('input[name="store"][value="storeA"]').checked;
        const storeBChecked = document.querySelector('input[name="store"][value="storeB"]').checked;
        const storeCChecked = document.querySelector('input[name="store"][value="storeC"]').checked;
        const storeDChecked = document.querySelector('input[name="store"][value="storeD"]').checked;
        const storeEChecked = document.querySelector('input[name="store"][value="storeE"]').checked;

        let keywords = [];
        if (storeAChecked) keywords.push('A店');
        if (storeBChecked) keywords.push('B店');
        if (storeCChecked) keywords.push('C店');
        if (storeDChecked) keywords.push('D店');
        if (storeEChecked) keywords.push('E店');

        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';

        // 選択された店舗がない場合
        if (keywords.length === 0) {
            resultsDiv.innerHTML = '<p>店舗名を選択してください。</p>';
            return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(textInput, 'text/html');

        const lines = doc.body.innerHTML.split('\n');
        const results = lines.filter(line => {
            return keywords.some(keyword => line.includes(keyword));
        });

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>指定した語句を含む行が見つかりませんでした。</p>';
        } else {
            const resultHtml = results.map(line => `<p>${line}</p>`).join('');
            resultsDiv.innerHTML = resultHtml;
        }
    });
}