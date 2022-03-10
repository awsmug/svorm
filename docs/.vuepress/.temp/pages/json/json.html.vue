<template><h2 id="json-documentation" tabindex="-1"><a class="header-anchor" href="#json-documentation" aria-hidden="true">#</a> JSON Documentation</h2>
<p>The root is the base wrapper for all content. It contains all settings for the form: Where it starts, where the data will be sent behavour, style and so on. The form at least must contain the paramater <em>fieldsets</em>.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>List of <em>form</em> parameters:</p>
<ul>
<li><strong>name</strong> - Name of the form, used in HTML form tag.</li>
<li><strong>start</strong> - ID the fieldset where the form will start.</li>
</ul>
<h3 id="fieldsets" tabindex="-1"><a class="header-anchor" href="#fieldsets" aria-hidden="true">#</a> Fieldsets</h3>
<p>The fieldsets param is an array of fieldsets which will be shown. The form can only show one fieldset at a time which is the <em>current fieldset</em>.</p>
<p>The single fieldset must contain a label, an id and the fields parameter.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Fieldset Label"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-fieldset"</span><span class="token punctuation">,</span>
            <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="start-fieldset" tabindex="-1"><a class="header-anchor" href="#start-fieldset" aria-hidden="true">#</a> Start fieldset</h4>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="components" tabindex="-1"><a class="header-anchor" href="#components" aria-hidden="true">#</a> Components</h3>
<h4 id="input-elements" tabindex="-1"><a class="header-anchor" href="#input-elements" aria-hidden="true">#</a> Input elements</h4>
<h5 id="text" tabindex="-1"><a class="header-anchor" href="#text" aria-hidden="true">#</a> Text</h5>
<h5 id="textarea" tabindex="-1"><a class="header-anchor" href="#textarea" aria-hidden="true">#</a> Textarea</h5>
<h5 id="choice-select" tabindex="-1"><a class="header-anchor" href="#choice-select" aria-hidden="true">#</a> Choice Select</h5>
<h5 id="choice-radio" tabindex="-1"><a class="header-anchor" href="#choice-radio" aria-hidden="true">#</a> Choice Radio</h5>
<h5 id="choice-image" tabindex="-1"><a class="header-anchor" href="#choice-image" aria-hidden="true">#</a> Choice Image</h5>
<h5 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h5>
<h4 id="content-elements" tabindex="-1"><a class="header-anchor" href="#content-elements" aria-hidden="true">#</a> Content elements</h4>
<h3 id="validation" tabindex="-1"><a class="header-anchor" href="#validation" aria-hidden="true">#</a> Validation</h3>
<h4 id="how-to-validate" tabindex="-1"><a class="header-anchor" href="#how-to-validate" aria-hidden="true">#</a> How to validate</h4>
<h4 id="validation-types" tabindex="-1"><a class="header-anchor" href="#validation-types" aria-hidden="true">#</a> Validation types</h4>
<h3 id="conditional-logic" tabindex="-1"><a class="header-anchor" href="#conditional-logic" aria-hidden="true">#</a> Conditional logic</h3>
<p>Conditionall logic allows you to <strong>show</strong> or <strong>hide</strong> elements depending on content of input fields.</p>
<p>Here is an example of a text element which is shown depending on the value of the choice of the input with the name <em>show</em>.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"test-form"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"conditional-logic"</span><span class="token punctuation">,</span>
    <span class="token property">"fieldsets"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Conditional Logic"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"conditional-logic"</span><span class="token punctuation">,</span>
            <span class="token property">"fields"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"show"</span><span class="token punctuation">,</span>
                    <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Show Textfield"</span><span class="token punctuation">,</span>
                    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"choice-radio"</span><span class="token punctuation">,</span>
                    <span class="token property">"choices"</span><span class="token operator">:</span> <span class="token punctuation">[</span>                        
                        <span class="token punctuation">{</span>
                            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"Ja"</span><span class="token punctuation">,</span>
                            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"yes"</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">{</span>
                            <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"No"</span><span class="token punctuation">,</span>
                            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"no"</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-text"</span><span class="token punctuation">,</span>
                    <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"You can see me!"</span><span class="token punctuation">,</span>
                    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"headline"</span><span class="token punctuation">,</span>
                    <span class="token property">"conditions"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            <span class="token property">"field"</span><span class="token operator">:</span> <span class="token string">"show"</span><span class="token punctuation">,</span>
                            <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"yes"</span><span class="token punctuation">,</span>
                            <span class="token property">"operator"</span><span class="token operator">:</span> <span class="token string">"=="</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div></template>
