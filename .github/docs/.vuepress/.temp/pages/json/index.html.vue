<template><h1 id="json-structure" tabindex="-1"><a class="header-anchor" href="#json-structure" aria-hidden="true">#</a> JSON Structure</h1>
<p>The JSON file allows you to define a form via a json config file.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>List of <em>form</em> parameters:</p>
<ul>
<li><strong>name</strong> - Name of the form, used in HTML form tag.</li>
<li><strong>start</strong> - ID the fieldset where the form will start.</li>
</ul>
<h3 id="fieldset" tabindex="-1"><a class="header-anchor" href="#fieldset" aria-hidden="true">#</a> Fieldset</h3>
<p>The fieldsets param is an array of fieldsets which will be shown. The form can only show one fieldset at a time which is the <em>current fieldset</em>.</p>
<p>The single fieldset must contain a label, an id and the fields parameter.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Fieldset Label"</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-fieldset"</span><span class="token punctuation">,</span>
    <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="fieldset-start" tabindex="-1"><a class="header-anchor" href="#fieldset-start" aria-hidden="true">#</a> Fieldset Start</h4>
<p>If you have more than one fieldset, the form starts with the first fieldset occuring in the fieldsets array. You also can set a start fieldset.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"part-two"</span><span class="token punctuation">,</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"I will be skipped"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"part-one"</span><span class="token punctuation">,</span>
            <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Here we are starting"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"part-two"</span><span class="token punctuation">,</span>
            <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"content"</span><span class="token punctuation">,</span>
                    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Tell us why you are here"</span><span class="token punctuation">,</span>
                    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"textarea"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="field" tabindex="-1"><a class="header-anchor" href="#field" aria-hidden="true">#</a> Field</h3>
<p>A field can be an input or a content field and have to be placed in the fields array of the fieldset.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Fieldset Label"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-fieldset"</span><span class="token punctuation">,</span>
            <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"content"</span><span class="token punctuation">,</span>
                    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Tell us why you are here"</span><span class="token punctuation">,</span>
                    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"textarea"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li><strong>See</strong>: <a href="/SvelteForm/field-types">Field Types</a></li>
</ul>
</template>
