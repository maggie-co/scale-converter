<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scale Converter</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="wrap">
    <header class="head">
      <h1>Scale Converter</h1>
      <p class="sub">Convert real-world dimensions to model scale and back.</p>
    </header>
    <div class="ruler" aria-hidden="true"></div>

    <main class="card">
      <!-- Two-way input -->
      <div class="io">
        <div class="field">
          <label for="realVal">Real dimensions</label>
          <input id="realVal" class="value" type="number" inputmode="decimal" value="47">
          <select id="realUnit" class="unit" aria-label="Real unit">
            <option value="in" selected>inches</option>
            <option value="ft">feet</option>
            <option value="mm">millimeters</option>
            <option value="cm">centimeters</option>
            <option value="m">meters</option>
          </select>
        </div>

        <div class="swap" aria-hidden="true">&#8596;</div>

        <div class="field">
          <label for="modelVal">Model dimensions</label>
          <input id="modelVal" class="value" type="number" inputmode="decimal">
          <select id="modelUnit" class="unit" aria-label="Model unit">
            <option value="in">inches</option>
            <option value="ft">feet</option>
            <option value="mm" selected>millimeters</option>
            <option value="cm">centimeters</option>
            <option value="m">meters</option>
          </select>
        </div>
      </div>

      <!-- Scale -->
      <div class="scale-row">
        <label for="scale">Scale</label>
        <select id="scale" class="scale">
          <optgroup label="Architectural (US)">
            <option value="48">1/4" = 1'-0" (1:48)</option>
            <option value="96">1/8" = 1'-0" (1:96)</option>
            <option value="192">1/16" = 1'-0" (1:192)</option>
            <option value="384">1/32" = 1'-0" (1:384)</option>
          </optgroup>
          <optgroup label="Engineering / Metric">
            <option value="10">1:10</option>
            <option value="20">1:20</option>
            <option value="50">1:50</option>
            <option value="100">1:100</option>
            <option value="200">1:200</option>
            <option value="500">1:500</option>
          </optgroup>
          <optgroup label="Model-making">
            <option value="12" selected>1:12</option>
            <option value="24">1:24</option>
            <option value="48">1:48</option>
            <option value="87">1:87</option>
          </optgroup>
          <option value="custom">Custom scale…</option>
        </select>
        <div id="customWrap" class="custom hidden">
          <span>1 :</span>
          <input id="customN" class="value sm" type="number" inputmode="decimal" placeholder="75">
        </div>
      </div>

      <p id="scaleInfo" class="scaleinfo"></p>
      <p id="paperInfo" class="paperinfo"></p>

      <!-- Result -->
      <div class="result" aria-live="polite">
        <span id="resultLabel" class="rlabel">Model size</span>
        <div class="big" id="bigValue">—</div>
        <div id="alsoLine" class="also"></div>
        <button id="copyBtn" class="copy" type="button">Copy all</button>
      </div>
    </main>
  </div>
  <script src="script.js"></script>
</body>
</html>
