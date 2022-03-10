<template><h1 id="validation" tabindex="-1"><a class="header-anchor" href="#validation" aria-hidden="true">#</a> Validation</h1>
<h2 id="how-to-validate" tabindex="-1"><a class="header-anchor" href="#how-to-validate" aria-hidden="true">#</a> How to validate</h2>
<h2 id="validation-types" tabindex="-1"><a class="header-anchor" href="#validation-types" aria-hidden="true">#</a> Validation types</h2>
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
