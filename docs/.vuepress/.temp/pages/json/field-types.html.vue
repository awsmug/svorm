<template><h1 id="field-types" tabindex="-1"><a class="header-anchor" href="#field-types" aria-hidden="true">#</a> Field Types</h1>
<h2 id="input-elements" tabindex="-1"><a class="header-anchor" href="#input-elements" aria-hidden="true">#</a> Input elements</h2>
<h3 id="text" tabindex="-1"><a class="header-anchor" href="#text" aria-hidden="true">#</a> Text</h3>
<p>A text field.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"first-name"</span><span class="token punctuation">,</span>
    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"First Name"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"text"</span>
<span class="token punctuation">}</span>         
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Parameters:</p>
<ul>
<li><strong>id</strong> (string) ID of the field.</li>
<li><strong>label</strong> (string) Label which will be shown in frontend.</li>
<li><strong>required</strong>: (true|false) Whether the field is required or not.</li>
<li><strong>classes</strong>: (string) Additional CSS classes.</li>
</ul>
<h3 id="textarea" tabindex="-1"><a class="header-anchor" href="#textarea" aria-hidden="true">#</a> Textarea</h3>
<p>A textarea field.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"message"</span><span class="token punctuation">,</span>
    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Your Message"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"textarea"</span>
<span class="token punctuation">}</span>         
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Parameters:</p>
<ul>
<li><strong>id</strong> (string) ID of the field.</li>
<li><strong>label</strong> (string) Label which will be shown in frontend.</li>
<li><strong>required</strong>: (true|false) Whether the field is required or not.</li>
<li><strong>classes</strong>: (string) Additional CSS classes.</li>
</ul>
<h3 id="choice-select" tabindex="-1"><a class="header-anchor" href="#choice-select" aria-hidden="true">#</a> Choice Select</h3>
<p>A select field.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"message"</span><span class="token punctuation">,</span>
    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Your Message"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"choice-select"</span><span class="token punctuation">,</span>
    <span class="token property">"choices"</span><span class="token operator">:</span> <span class="token punctuation">[</span>                        
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Yes"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"yes"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"No"</span><span class="token punctuation">,</span>
            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"no"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>         
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Parameters:</p>
<ul>
<li><strong>id</strong> (string) ID of the field.</li>
<li><strong>label</strong> (string) Label which will be shown in frontend.</li>
<li><strong>required</strong>: (true|false) Whether the field is required or not.</li>
<li><strong>classes</strong>: (string) Additional CSS classes.</li>
<li><strong>choices</strong>: (array) An array of choices.</li>
</ul>
<h3 id="choice-radio" tabindex="-1"><a class="header-anchor" href="#choice-radio" aria-hidden="true">#</a> Choice Radio</h3>
<h3 id="choice-image" tabindex="-1"><a class="header-anchor" href="#choice-image" aria-hidden="true">#</a> Choice Image</h3>
<h3 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h3>
<h2 id="content-elements" tabindex="-1"><a class="header-anchor" href="#content-elements" aria-hidden="true">#</a> Content elements</h2>
<h3 id="headline" tabindex="-1"><a class="header-anchor" href="#headline" aria-hidden="true">#</a> Headline</h3>
<h3 id="text-1" tabindex="-1"><a class="header-anchor" href="#text-1" aria-hidden="true">#</a> Text</h3>
</template>
