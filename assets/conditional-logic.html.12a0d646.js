import{e as n}from"./app.efa357d7.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="conditional-logic" tabindex="-1"><a class="header-anchor" href="#conditional-logic" aria-hidden="true">#</a> Conditional Logic</h1><p>Conditionall logic allows you to <strong>show</strong> or <strong>hide</strong> elements depending on content of input fields.</p><p>Here is an example of a text element which is shown depending on the value of the choice of the input with the name <em>show</em>.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test-form&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;conditional-logic&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fieldsets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Conditional Logic&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;conditional-logic&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;show&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Show Textfield&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;choice-radio&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;choices&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>                        
                        <span class="token punctuation">{</span>
                            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Ja&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yes&quot;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">{</span>
                            <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;No&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;no&quot;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;my-text&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;You can see me!&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;headline&quot;</span><span class="token punctuation">,</span>
                    <span class="token property">&quot;conditions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                        <span class="token punctuation">{</span>
                            <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;show&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yes&quot;</span><span class="token punctuation">,</span>
                            <span class="token property">&quot;operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;==&quot;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">]</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,4);function t(o,e){return p}var r=s(a,[["render",t]]);export{r as default};
