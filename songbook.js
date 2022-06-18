window.addEventListener('DOMContentLoaded', e => {
    document.getElementById("font-size-up").addEventListener("click", e => {
        document.querySelectorAll(".lyrics").forEach(lyrics => {
            var size = parseFloat(getComputedStyle(lyrics).fontSize)
            lyrics.style.fontSize = (size + 1) + "px"
        })
    })
    document.getElementById("font-size-down").addEventListener("click", e => {
        document.querySelectorAll(".lyrics").forEach(lyrics => {
            var size = parseFloat(getComputedStyle(lyrics).fontSize)
            lyrics.style.fontSize = (size - 1) + "px"
        })
    })
})

window.addEventListener('DOMContentLoaded', e => {

    var transposeDownMap = {
        "A":  "A♭",
        "A♯": "A",
        "B♭": "A",
        "B":  "B♭",
        "C":  "B",
        "C♯": "C",
        "D♭": "C",
        "D":  "D♭",
        "D♯": "D",
        "E♭": "D",
        "E":  "E♭",
        "F":  "E",
        "F♯": "F",
        "G♭": "F",
        "G":  "G♭",
        "G♯": "G",
        "A♭": "G",
    }

    var transposeUpMap = {
        "A":  "A♯",
        "A♯": "B",
        "B♭": "B",
        "B":  "C",
        "C":  "C♯",
        "C♯": "D",
        "D♭": "D",
        "D":  "D♯",
        "D♯": "E",
        "E♭": "E",
        "E":  "F",
        "F":  "F♯",
        "F♯": "G",
        "G♭": "G",
        "G":  "G♯",
        "G♯": "A",
        "A♭": "A",
    }

    var transposeIndex = function(c, index, map) {
            var simpleChord = c[index]
            var chordPrefix = c.substring(0, index)
            var chordSuffix = c.substring(index + 1)
            if (c.length > index + 1 && (c[index + 1] === "♯" || c[index + 1] === "♭")) {
                simpleChord = c.substring(index, index + 2)
                chordSuffix = c.substring(index + 2)
            }
            var t = map[simpleChord]
            if (t !== undefined) {
                c = chordPrefix + t + chordSuffix
            }
            return c
    }

    var transpose = function(map) {
        document.querySelectorAll(".inside-chord").forEach(chord => {

            var c = chord.textContent
            c = transposeIndex(c, 0, map)
            var slashIndex = c.indexOf("/")
            if (slashIndex >= 0 && c.length > slashIndex + 1) {
                c = transposeIndex(c, slashIndex + 1, map)
            }

            chord.textContent = c
        })
    }
    document.getElementById("transpose-up").addEventListener("click", e => {
        transpose(transposeUpMap)
    })
    document.getElementById("transpose-down").addEventListener("click", e => {
        transpose(transposeDownMap)
    })
})
