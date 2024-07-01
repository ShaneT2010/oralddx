$(document).ready(function() {
    const diseases = [
        { name: 'Disease A', characteristics: ['male', 'newborn', 'alcohol', 'upper_right_buccal'] },
        { name: 'Disease B', characteristics: ['female', 'child', 'cigarette', 'lower_left_lingual'] },
        // Add more diseases and their characteristics here
    ];

    function switchLanguage(lang) {
        $('[data-en]').each(function() {
            $(this).text($(this).data(lang));
        });
    }

    $('#switch-to-en').click(function() {
        switchLanguage('en');
    });

    $('#switch-to-zh').click(function() {
        switchLanguage('zh');
    });

    $('#symptomForm').submit(function(event) {
        event.preventDefault();

        const symptoms = [];
        $('input[type="checkbox"]:checked').each(function() {
            symptoms.push(this.value);
        });
        $('input[type="radio"]:checked').each(function() {
            symptoms.push(this.value);
        });
        const location = $('#location').val();
        if (location) {
            symptoms.push(location);
        }

        const scores = diseases.map(disease => {
            let score = 0;
            disease.characteristics.forEach(characteristic => {
                if (symptoms.includes(characteristic)) {
                    score++;
                }
            });
            return { name: disease.name, score: score, characteristics: disease.characteristics };
        });

        scores.sort((a, b) => b.score - a.score);

        $('#results').empty();
        for (let i = 0; i < Math.min(10, scores.length); i++) {
            $('#results').append('<p>' + scores[i].name + ' (Score: ' + scores[i].score + ')</p>');
            $('#results').append('<p>Characteristics: ' + scores[i].characteristics.join(', ') + '</p>');
        }
    });

    $('area').click(function(event) {
        event.preventDefault();
        const location = $(this).attr('data-en').toLowerCase().replace(/\s+/g, '_');
        $('#location').val(location);
        $('area').removeClass('selected');
        $(this).addClass('selected');
    });

    switchLanguage('en'); // Default language
});
