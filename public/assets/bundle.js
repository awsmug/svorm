
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root.host) {
            return root;
        }
        return document;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * Help class.
     *
     * @since 1.0.0
     */
    class Help$1 {
        /**
         * Initializing help.
         *
         * @param help  Help data.
         *
         * @since 1.0.0
         */
        constructor(help) {
            this.type = help.type;
            this.content = help.content;
        }
    }

    /**
     * Validation methods
     *
     * @since 1.0.0
     */
    class ValidationMedhods {
        /**
         * Is value of tye string?
         *
         * @param value Value which have to be checked.
         * @return boolean True if is of type string, false if not.
         *
         * @since 1.0.0
         */
        static string(value) {
            if (typeof value === 'string' || value instanceof String) {
                return true;
            }
            return false;
        }
        /**
         * Is value of tye string?
         *
         * @param value Value which have to be checked.
         * @return boolean True if is of type string, false if not.
         *
         * @since 1.0.0
         */
        static email(value) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        /**
         * Is number not under min?
         *
         * @param value Value which have to be checked.
         * @param min Max number.
         *
         * @return boolean True if number not under min.
         *
         * @since 1.0.0
         */
        static min(value, min) {
            if (value === undefined)
                return false;
            return !(value < min);
        }
        /**
         * Is number not over max?
         *
         * @param value Value which have to be checked.
         * @param min Min number.
         *
         * @return boolean True if number not over max.
         *
         * @since 1.0.0
         */
        static max(value, max) {
            if (value === undefined)
                return false;
            return !(value > max);
        }
        /**
         * Is string not under min length?
         *
         * @param value Value which have to be checked.
         * @param min Max number of chars.
         *
         * @return boolean True if string length is not under min length.
         *
         * @since 1.0.0
         */
        static minLength(value, min) {
            if (value === undefined)
                return false;
            return !(value.length < min);
        }
        /**
         * Is string not over max length?
         *
         * @param value Value which have to be checked.
         * @param min Max number of chars.
         *
         * @return boolean True if string length is not over max length.
         *
         * @since 1.0.0
         */
        static maxLength(value, max) {
            if (value === undefined)
                return false;
            return !(value.length > max);
        }
        /**
         * Is value empty?
         *
         * @param value Value which have to be checked.
         * @return boolean True if is empty, false if not.
         *
         * @since 1.0.0
         */
        static empty(value) {
            if (value === undefined || value.trim() === '') {
                return true;
            }
            return false;
        }
        /**
         * Is value in array?
         *
         * @param value Needle.
         * @param value Haystack.
         * @return boolean True if found, false if not.
         *
         * @since 1.0.0
         */
        static inArray(value, values) {
            return values.includes(value);
        }
        /**
         * Checks if value is checked
         *
         * @param value Value of the field.
         * @return boolean True if is checked, false if not.
         *
         * @since 1.0.0
         */
        static isChecked(value) {
            return value == true ? true : false;
        }
    }

    /**
     * Validator class.
     *
     * @since 1.0.0
     */
    class Validator {
        /**
         * Constructor.
         *
         * @param value      A value which have to be validated.
         * @param validation Validation rules array.
         * @param required   Is value required or not.
         *
         * @since 1.0.0
         */
        constructor(value, validations) {
            this.value = value;
            this.validations = validations;
        }
        /**
         * Doing check for given values.
         *
         * @since 1.0.0
         */
        check() {
            let errors = [];
            // Running each validation
            this.validations.forEach(validation => {
                let valueAsNumber = validation.value;
                // Assigning Validation functions
                switch (validation.type) {
                    case 'string':
                        if (!ValidationMedhods.string(this.value)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'email':
                        if (!ValidationMedhods.email(this.value)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'min':
                        if (!ValidationMedhods.min(this.value, valueAsNumber)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'max':
                        if (!ValidationMedhods.max(this.value, valueAsNumber)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'minLength':
                        if (!ValidationMedhods.minLength(this.value, valueAsNumber)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'maxLength':
                        if (!ValidationMedhods.maxLength(this.value, valueAsNumber)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'empty':
                        if (ValidationMedhods.empty(this.value)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'inArray':
                        if (!ValidationMedhods.inArray(this.value, validation.values)) {
                            errors.push(validation.error);
                        }
                        break;
                    case 'isChecked':
                        console.log(this);
                        if (!ValidationMedhods.isChecked(this.value)) {
                            errors.push(validation.error);
                        }
                        break;
                    default:
                        errors.push('Validations-Typ "' + validation.type + '" existiert nicht."');
                        break;
                }
            });
            return errors;
        }
    }

    /**
     * Field class.
     *
     * @since 1.0.0
     */
    class Field {
        /**
         * Initializing field.
         *
         * @param name  Name of the field.
         * @param field Field object
         *
         * @since 1.0.0
         */
        constructor(fieldset, field) {
            this.validated = false;
            this.errors = [];
            this.fieldset = fieldset;
            this.name = field.name;
            this.type = field.type;
            this.label = field.label;
            this.placeholder = field.placeholder;
            this.help = field.help === undefined ? undefined : new Help$1(field.help);
            this.choices = field.choices === undefined ? [] : field.choices;
            this.params = field.params === undefined ? [] : field.params;
            this.classes = field.classes === undefined ? [] : field.classes;
            this.required = field.required === undefined ? false : true;
            this.validations = field.validations === undefined ? [] : field.validations;
            this.value = field.value;
        }
        /**
         * Set value of field.
         *
         * @param value Value to set.
         *
         * @since 1.0.0
         */
        setValue(value) {
            this.value = value;
        }
        /**
         * Get value of field.
         *
         * @param value Value to set.
         *
         * @since 1.0.0
         */
        getValue() {
            return this.value;
        }
        /**
         * Does field have choices.
         *
         * @return True if it has choices, false if not.
         *
         * @since 1.0.0
         */
        hasChoices() {
            return this.choices.length > 0;
        }
        /**
         * Add a CSS class to field.
         *
         * @param className CSS class name.
         *
         * @since 1.0.0
         */
        addClass(className) {
            this.removeClass(className); // Remove maybe existing class
            this.classes.push(className);
        }
        /**
         * Add a CSS class to field.
         *
         * @param className CSS class name.
         *
         * @since 1.0.0
         */
        removeClass(className) {
            this.classes = this.classes.filter(function (value) {
                return value !== className;
            });
        }
        /**
         * Get CSS Classes.
         *
         * @return String of CSS classes.
         *
         * @since 1.0.0
         */
        getClasses(additionalClasses = []) {
            if (this.classes.length > 0) {
                return additionalClasses.concat(this.classes).join(' ');
            }
            return additionalClasses.join(' ');
        }
        /**
         * Validate the field.
         *
         * @return Array of errors, empty array on no errors.
         *
         * @since 1.0.0
         */
        validate() {
            let validation = new Validator(this.value, this.validations);
            this.errors = validation.check();
            if (this.errors.length > 0) {
                this.addClass('error');
                this.removeClass('validated');
            }
            else {
                this.removeClass('error');
                this.addClass('validated');
            }
            this.wasValidated = true;
            return this.errors;
        }
        /**
         * Get validation errors.
         *
         * @return Erros which occured while validating.
         *
         * @since 1.0.0
         */
        getValidationErors() {
            return this.errors;
        }
        /**
         * Has field validation errors.
         *
         * @return True if field has errors, false if not.
         *
         * @since 1.0.0
         */
        hasValidationErrors() {
            if (this.errors.length > 0) {
                return true;
            }
            return false;
        }
        /**
         * Has the field already ben validated
         *
         * @return True if field has been validated, false if not.
         *
         * @since 1.0.0
         */
        hasBeenValidated() {
            return this.validated;
        }
    }

    /**
     * Class Fieldset.
     *
     * @since 1.0.0
     */
    class Fieldset$1 {
        /**
         * Initializing fieldset.
         *
         * @param form Form object.
         * @param fieldset Fieldset data.
         *
         * @since 1.0.0
         */
        constructor(form, fieldset) {
            this.fields = [];
            this.form = form;
            this.name = fieldset.name;
            this.label = fieldset.label;
            this.percentage = fieldset.percentage;
            this.params = undefined === fieldset.params ? [] : fieldset.params;
            this.classes = undefined === fieldset.classes ? [] : fieldset.classes;
            this.fieldsClasses = undefined === fieldset.fieldsClasses ? [] : fieldset.fieldsClasses;
            this.conditions = undefined === fieldset.conditions ? [] : fieldset.conditions;
            this.submission = fieldset.submission;
            this.nextFieldset = fieldset.nextFieldset;
            this.prevFieldset = fieldset.prevFieldset;
            fieldset.fields.forEach(field => {
                this.fields.push(new Field(this, field));
            });
        }
        conditionsFullfilled() {
            if (this.conditions.length === 0) {
                return true;
            }
            let fullfillments = [];
            this.conditions.forEach((condition) => {
                let fullfilled = false;
                let field = this.form.getField(condition.field);
                switch (condition.operator) {
                    case '==':
                        fullfilled = condition.value === field.getValue();
                        break;
                    case '!=':
                        fullfilled = condition.value !== field.getValue();
                        break;
                    case '>':
                        fullfilled = condition.value !== field.getValue();
                        break;
                    case '<':
                        fullfilled = condition.value !== field.getValue();
                        break;
                    default:
                        throw new Error('Operator "' + condition.operator + '" does not exist.');
                }
                fullfillments.push(fullfilled);
            });
            return !fullfillments.includes(false);
        }
        /**
         * Get CSS classes.
         *
         * @return String of CSS classes.
         *
         * @since 1.0.0
         */
        getClasses() {
            if (this.classes.length > 0) {
                return this.classes.join(' ');
            }
            return '';
        }
        /**
         * Get CSS field classes.
         *
         * @return String of CSS classes.
         *
         * @since 1.0.0
         */
        getFieldsClasses() {
            if (this.fieldsClasses.length > 0) {
                return this.fieldsClasses.join(' ');
            }
            return '';
        }
        /**
         * Validate fieldset.
         *
         * @return True on successful validation, false on errors.
         *
         * @since 1.0.0
         */
        validate() {
            let foundError = false;
            this.fields.forEach((field, i) => {
                if (field.validate().length > 0 && !foundError) {
                    foundError = true;
                }
            });
            return foundError;
        }
        /**
         * Has fieldset validation errors.
         *
         * @return True if fieldset has errors, false if not.
         *
         * @since 1.0.0
         */
        hasValidationErrors() {
            let foundError = false;
            this.fields.forEach((field) => {
                if (field.hasValidationErrors() && !foundError) {
                    foundError = true;
                }
            });
            return foundError;
        }
    }

    class Navigation$1 {
        /**
         * Initializing navigation.
         *
         * @param form  Form object.
         * @param start Name of start fieldset.
         *
         * @since 1.0.0
         */
        constructor(form, startFieldset) {
            this.recentFieldsets = [];
            this.form = form;
            this.setCurrentFieldset(startFieldset);
        }
        /**
         * Get last action.
         *
         * @return Last action (prev or next).
         *
         * @since 1.0.0
         */
        getLastAction() {
            return this.lastAction;
        }
        /**
         * Set current fieldset.
         *
         * @param name Name of fieldset.
         *
         * @since 1.0.0
         */
        setCurrentFieldset(name) {
            let currentFieldset = this.form.getFieldset(name);
            if (currentFieldset === undefined) {
                throw new Error('Cant set current fieldset to "' + name + '". Fieldset name does not exist.');
            }
            else {
                this.currentFieldset = currentFieldset;
            }
            return this;
        }
        /**
         * Get current fieldset.
         *
         * @return Current fieldset.
         *
         * @since 1.0.0
         */
        getCurrentFieldset() {
            return this.currentFieldset;
        }
        /**
         * Set previous fieldset.
         *
         * @return Navigation object.
         *
         * @since 1.0.0
         */
        prevFieldset() {
            if (!this.hasPrevFieldset()) {
                return this;
            }
            this.lastAction = 'prev';
            this.setCurrentFieldset(this.recentFieldsets.pop());
            return this;
        }
        /**
         * Set next fieldset.
         *
         * @return Navigation object.
         *
         * @since 1.0.0
         */
        nextFieldset() {
            this.currentFieldset.validate();
            if (this.currentFieldset.hasValidationErrors()) {
                return this;
            }
            let nextFieldset = this.getNextFieldset();
            if (nextFieldset !== undefined) {
                this.recentFieldsets.push(this.currentFieldset.name);
                this.lastAction = 'next';
                this.setCurrentFieldset(nextFieldset.name);
                return this;
            }
            throw new Error('No next fieldset not found.');
        }
        /**
         * Is there a previous fieldset?
         *
         * @return True if there is a previous fieldset, false if not.
         *
         * @since 1.0.0
         */
        hasPrevFieldset() {
            return this.recentFieldsets.length > 0;
        }
        /**
         * Is there a next fieldset?
         *
         * @return True if there is a previous fieldset, false if not.
         *
         * @since 1.0.0
         */
        hasNextFieldset() {
            if (this.currentFieldset.nextFieldset !== undefined) {
                return true;
            }
            let nextFieldset = this.getNextFieldset();
            if (nextFieldset !== undefined) {
                return true;
            }
            return false;
        }
        /**
         * Returns the next fieldset.
         *
         * @return Next fieldset object.
         *
         * @since 1.0.0
         */
        getNextFieldset() {
            if (this.currentFieldset.nextFieldset !== undefined) {
                return this.form.getFieldset(this.currentFieldset.nextFieldset);
            }
            let nextFieldsets = this.getPossibleNextFieldsets();
            let nextFieldset;
            if (nextFieldsets.length === 0) {
                return nextFieldset;
            }
            nextFieldsets.forEach((fieldset) => {
                if (fieldset.conditionsFullfilled() && nextFieldset === undefined) {
                    nextFieldset = fieldset;
                }
            });
            return nextFieldset;
        }
        /**
         * Returns the previous fieldset.
         *
         * @return Previous fieldset object.
         *
         * @since 1.0.0
         */
        getPrevFieldset() {
            if (!this.hasPrevFieldset()) {
                throw Error('There is no previous fieldset');
            }
            let preFieldsetName = this.recentFieldsets[this.recentFieldsets.length - 1];
            return this.form.getFieldset(preFieldsetName);
        }
        /**
         * Returns a possible fieldsets.
         *
         * Possible fieldsets are all fieldsets which containing a prevFieldset, containing the current fieldset.
         *
         * @return An array of Fieldsets.
         *
         * @since 1.0.0
         */
        getPossibleNextFieldsets() {
            let nextFieldsets = this.form.fieldsets.filter((fieldset) => {
                return fieldset.prevFieldset === this.currentFieldset.name;
            });
            return nextFieldsets;
        }
    }

    /**
     * Class Form.
     *
     * @since 1.0.0
     */
    class Form {
        /**
         * Initializing form data.
         *
         * @param formData Formdata from JSON file.
         *
         * @since 1.0.0
         */
        constructor(formData) {
            this.name = formData.name;
            this.classes = formData.classes;
            this.fieldsets = [];
            formData.fieldsets.forEach((fieldset) => {
                this.fieldsets.push(new Fieldset$1(this, fieldset));
            });
            this.navigation = new Navigation$1(this, formData.start);
        }
        /**
         * Get a specific fieldset.
         *
         * @param name Name of fieldset
         * @return Fieldset
         *
         * @since 1.0.0
         */
        getFieldset(name) {
            let fieldsets = this.fieldsets.filter((fieldset) => {
                return fieldset.name === name;
            });
            return fieldsets[0];
        }
        getField(name) {
            let foundField;
            this.fieldsets.forEach((fieldset) => {
                fieldset.fields.forEach((field) => {
                    if (field.name === name) {
                        foundField = field;
                    }
                });
            });
            return foundField;
        }
        /**
         * Has form validation errors.
         *
         * @return True if field has errors, false if not.
         *
         * @since 1.0.0
         */
        hasValidationErrors() {
            let hasValidationErrors = false;
            this.fieldsets.forEach((fieldset) => {
                if (fieldset.hasValidationErrors()) {
                    hasValidationErrors = true;
                    return;
                }
            });
            return hasValidationErrors;
        }
        /**
         * Get CSS Classes.
         *
         * @return String of CSS classes.
         *
         * @since 1.0.0
         */
        getClasses() {
            if (this.classes.length > 0) {
                return this.classes.join(' ');
            }
            return '';
        }
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src/Components/Help.svelte generated by Svelte v3.42.1 */
    const file$d = "src/Components/Help.svelte";

    // (7:0) {#if field.help !== undefined && show }
    function create_if_block$9(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let raw_value = /*field*/ ctx[0].help.content + "";
    	let div1_id_value;
    	let div2_transition;
    	let current;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "input-help-triangle");
    			add_location(div0, file$d, 8, 8, 201);
    			attr_dev(div1, "id", div1_id_value = "" + (/*field*/ ctx[0].name + "-help"));
    			attr_dev(div1, "class", "input-help-content");
    			add_location(div1, file$d, 9, 8, 249);
    			attr_dev(div2, "class", "input-help");
    			add_location(div2, file$d, 7, 4, 152);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			div1.innerHTML = raw_value;
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*field*/ 1) && raw_value !== (raw_value = /*field*/ ctx[0].help.content + "")) div1.innerHTML = raw_value;
    			if (!current || dirty & /*field*/ 1 && div1_id_value !== (div1_id_value = "" + (/*field*/ ctx[0].name + "-help"))) {
    				attr_dev(div1, "id", div1_id_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, {}, true);
    				div2_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fade, {}, false);
    			div2_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching && div2_transition) div2_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(7:0) {#if field.help !== undefined && show }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*field*/ ctx[0].help !== undefined && /*show*/ ctx[1] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*field*/ ctx[0].help !== undefined && /*show*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*field, show*/ 3) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Help', slots, []);
    	
    	let { field } = $$props;
    	let { show } = $$props;
    	const writable_props = ['field', 'show'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Help> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('show' in $$props) $$invalidate(1, show = $$props.show);
    	};

    	$$self.$capture_state = () => ({ fade, field, show });

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('show' in $$props) $$invalidate(1, show = $$props.show);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [field, show];
    }

    class Help extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { field: 0, show: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Help",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Help> was created without expected prop 'field'");
    		}

    		if (/*show*/ ctx[1] === undefined && !('show' in props)) {
    			console.warn("<Help> was created without expected prop 'show'");
    		}
    	}

    	get field() {
    		throw new Error("<Help>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Help>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		throw new Error("<Help>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Help>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/HelpIcon.svelte generated by Svelte v3.42.1 */
    const file$c = "src/Components/HelpIcon.svelte";

    // (10:0) {#if field.help !== undefined }
    function create_if_block$8(ctx) {
    	let div;
    	let if_block0_anchor;
    	let div_class_value;
    	let mounted;
    	let dispose;
    	let if_block0 = /*field*/ ctx[0].help.type == 'question' && create_if_block_2$1(ctx);
    	let if_block1 = /*field*/ ctx[0].help.type == 'info' && create_if_block_1$3(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", div_class_value = "icon-" + /*field*/ ctx[0].help.type);
    			add_location(div, file$c, 10, 4, 233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, if_block0_anchor);
    			if (if_block1) if_block1.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*toggleHelp*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*field*/ ctx[0].help.type == 'question') {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					if_block0.m(div, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*field*/ ctx[0].help.type == 'info') {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_1$3(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*field*/ 1 && div_class_value !== (div_class_value = "icon-" + /*field*/ ctx[0].help.type)) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(10:0) {#if field.help !== undefined }",
    		ctx
    	});

    	return block;
    }

    // (13:8) {#if field.help.type == 'question' }
    function create_if_block_2$1(ctx) {
    	let svg;
    	let path;
    	let t;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t = space();
    			attr_dev(path, "d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z");
    			add_location(path, file$c, 14, 12, 559);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "8");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "class", "bi bi-question-circle-fill");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$c, 13, 8, 409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(13:8) {#if field.help.type == 'question' }",
    		ctx
    	});

    	return block;
    }

    // (17:13) {#if field.help.type == 'info' }
    function create_if_block_1$3(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z");
    			add_location(path, file$c, 18, 12, 1310);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "16");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "fill", "currentColor");
    			attr_dev(svg, "class", "bi bi-exclamation-circle-fill");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$c, 17, 8, 1156);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(17:13) {#if field.help.type == 'info' }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let if_block_anchor;
    	let if_block = /*field*/ ctx[0].help !== undefined && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*field*/ ctx[0].help !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HelpIcon', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();

    	const toggleHelp = () => {
    		dispatch('toggleHelp');
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HelpIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		field,
    		dispatch,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [field, toggleHelp];
    }

    class HelpIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HelpIcon",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<HelpIcon> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<HelpIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<HelpIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Errors.svelte generated by Svelte v3.42.1 */

    const file$b = "src/Components/Errors.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (5:0) {#if field.hasValidationErrors() }
    function create_if_block$7(ctx) {
    	let div;
    	let ul;
    	let each_value = /*field*/ ctx[0].getValidationErors();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$b, 6, 4, 109);
    			attr_dev(div, "class", "errors");
    			add_location(div, file$b, 5, 0, 84);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1) {
    				each_value = /*field*/ ctx[0].getValidationErors();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(5:0) {#if field.hasValidationErrors() }",
    		ctx
    	});

    	return block;
    }

    // (8:4) {#each field.getValidationErors() as errortext}
    function create_each_block$5(ctx) {
    	let li;
    	let div0;
    	let t0;
    	let div1;
    	let t1_value = /*errortext*/ ctx[1] + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			li = element("li");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(div0, "class", "error-triangle");
    			add_location(div0, file$b, 9, 12, 191);
    			attr_dev(div1, "class", "error-content");
    			add_location(div1, file$b, 10, 12, 238);
    			add_location(li, file$b, 8, 8, 174);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div0);
    			append_dev(li, t0);
    			append_dev(li, div1);
    			append_dev(div1, t1);
    			append_dev(li, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1 && t1_value !== (t1_value = /*errortext*/ ctx[1] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(8:4) {#each field.getValidationErors() as errortext}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let show_if = /*field*/ ctx[0].hasValidationErrors();
    	let if_block_anchor;
    	let if_block = show_if && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*field*/ 1) show_if = /*field*/ ctx[0].hasValidationErrors();

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Errors', slots, []);
    	
    	let { field } = $$props;
    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Errors> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({ field });

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [field];
    }

    class Errors extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Errors",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Errors> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<Errors>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Errors>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/Text.svelte generated by Svelte v3.42.1 */
    const file$a = "src/Components/Inputs/Text.svelte";

    function create_fragment$b(ctx) {
    	let div1;
    	let label;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let helpicon;
    	let label_for_value;
    	let t2;
    	let div0;
    	let input;
    	let input_name_value;
    	let input_placeholder_value;
    	let input_aria_describedby_value;
    	let t3;
    	let errors;
    	let div1_class_value;
    	let t4;
    	let help;
    	let current;
    	let mounted;
    	let dispose;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label = element("label");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(helpicon.$$.fragment);
    			t2 = space();
    			div0 = element("div");
    			input = element("input");
    			t3 = space();
    			create_component(errors.$$.fragment);
    			t4 = space();
    			create_component(help.$$.fragment);
    			attr_dev(label, "for", label_for_value = /*field*/ ctx[0].name);
    			add_location(label, file$a, 19, 4, 523);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", input_name_value = /*field*/ ctx[0].name);
    			attr_dev(input, "placeholder", input_placeholder_value = /*field*/ ctx[0].placeholder);

    			attr_dev(input, "aria-describedby", input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			add_location(input, file$a, 24, 8, 689);
    			attr_dev(div0, "class", "input-text-field");
    			add_location(div0, file$a, 23, 4, 650);
    			attr_dev(div1, "class", div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div1, file$a, 18, 0, 477);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label);
    			append_dev(label, t0);
    			append_dev(label, t1);
    			mount_component(helpicon, label, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			set_input_value(input, /*field*/ ctx[0].value);
    			append_dev(div1, t3);
    			mount_component(errors, div1, null);
    			insert_dev(target, t4, anchor);
    			mount_component(help, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(input, "blur", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);

    			if (!current || dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].name)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_name_value !== (input_name_value = /*field*/ ctx[0].name)) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_placeholder_value !== (input_placeholder_value = /*field*/ ctx[0].placeholder)) {
    				attr_dev(input, "placeholder", input_placeholder_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_aria_describedby_value !== (input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(input, "aria-describedby", input_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1 && input.value !== /*field*/ ctx[0].value) {
    				set_input_value(input, /*field*/ ctx[0].value);
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div1_class_value !== (div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(helpicon);
    			destroy_component(errors);
    			if (detaching) detach_dev(t4);
    			destroy_component(help, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Text', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-text'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Text> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		field.value = this.value;
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [field, showHelp, classes, setValue, toggleHelp, input_input_handler];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Text> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/Textarea.svelte generated by Svelte v3.42.1 */
    const file$9 = "src/Components/Inputs/Textarea.svelte";

    function create_fragment$a(ctx) {
    	let div1;
    	let label;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let helpicon;
    	let label_for_value;
    	let t2;
    	let div0;
    	let textarea;
    	let textarea_name_value;
    	let textarea_placeholder_value;
    	let textarea_aria_describedby_value;
    	let t3;
    	let errors;
    	let div1_class_value;
    	let t4;
    	let help;
    	let current;
    	let mounted;
    	let dispose;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label = element("label");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(helpicon.$$.fragment);
    			t2 = space();
    			div0 = element("div");
    			textarea = element("textarea");
    			t3 = space();
    			create_component(errors.$$.fragment);
    			t4 = space();
    			create_component(help.$$.fragment);
    			attr_dev(label, "for", label_for_value = /*field*/ ctx[0].name);
    			add_location(label, file$9, 19, 4, 527);
    			attr_dev(textarea, "name", textarea_name_value = /*field*/ ctx[0].name);
    			attr_dev(textarea, "placeholder", textarea_placeholder_value = /*field*/ ctx[0].placeholder);

    			attr_dev(textarea, "aria-describedby", textarea_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			add_location(textarea, file$9, 23, 9, 658);
    			add_location(div0, file$9, 23, 4, 653);
    			attr_dev(div1, "class", div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div1, file$9, 18, 0, 481);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label);
    			append_dev(label, t0);
    			append_dev(label, t1);
    			mount_component(helpicon, label, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, textarea);
    			set_input_value(textarea, /*field*/ ctx[0].value);
    			append_dev(div1, t3);
    			mount_component(errors, div1, null);
    			insert_dev(target, t4, anchor);
    			mount_component(help, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[5]),
    					listen_dev(textarea, "blur", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);

    			if (!current || dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].name)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			if (!current || dirty & /*field*/ 1 && textarea_name_value !== (textarea_name_value = /*field*/ ctx[0].name)) {
    				attr_dev(textarea, "name", textarea_name_value);
    			}

    			if (!current || dirty & /*field*/ 1 && textarea_placeholder_value !== (textarea_placeholder_value = /*field*/ ctx[0].placeholder)) {
    				attr_dev(textarea, "placeholder", textarea_placeholder_value);
    			}

    			if (!current || dirty & /*field*/ 1 && textarea_aria_describedby_value !== (textarea_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(textarea, "aria-describedby", textarea_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1) {
    				set_input_value(textarea, /*field*/ ctx[0].value);
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div1_class_value !== (div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(helpicon);
    			destroy_component(errors);
    			if (detaching) detach_dev(t4);
    			destroy_component(help, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Textarea', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-textarea'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Textarea> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		field.value = this.value;
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [field, showHelp, classes, setValue, toggleHelp, textarea_input_handler];
    }

    class Textarea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textarea",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Textarea> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/Range.svelte generated by Svelte v3.42.1 */
    const file$8 = "src/Components/Inputs/Range.svelte";

    // (21:38) {#if field.params.unit !== undefined}
    function create_if_block$6(ctx) {
    	let t_value = /*field*/ ctx[0].params.unit + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1 && t_value !== (t_value = /*field*/ ctx[0].params.unit + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(21:38) {#if field.params.unit !== undefined}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div;
    	let label;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let t2_value = /*field*/ ctx[0].value + "";
    	let t2;
    	let t3;
    	let t4;
    	let helpicon;
    	let label_for_value;
    	let t5;
    	let input;
    	let input_name_value;
    	let input_min_value;
    	let input_max_value;
    	let input_step_value;
    	let t6;
    	let errors;
    	let div_class_value;
    	let t7;
    	let help;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*field*/ ctx[0].params.unit !== undefined && create_if_block$6(ctx);

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			t0 = text(t0_value);
    			t1 = text(":  ");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			create_component(helpicon.$$.fragment);
    			t5 = space();
    			input = element("input");
    			t6 = space();
    			create_component(errors.$$.fragment);
    			t7 = space();
    			create_component(help.$$.fragment);
    			attr_dev(label, "for", label_for_value = /*field*/ ctx[0].name);
    			add_location(label, file$8, 19, 4, 522);
    			attr_dev(input, "name", input_name_value = /*field*/ ctx[0].name);
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", input_min_value = /*field*/ ctx[0].params.min);
    			attr_dev(input, "max", input_max_value = /*field*/ ctx[0].params.max);
    			attr_dev(input, "step", input_step_value = /*field*/ ctx[0].params.step);
    			add_location(input, file$8, 23, 4, 726);
    			attr_dev(div, "class", div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div, file$8, 18, 0, 478);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			append_dev(label, t3);
    			if (if_block) if_block.m(label, null);
    			append_dev(label, t4);
    			mount_component(helpicon, label, null);
    			append_dev(div, t5);
    			append_dev(div, input);
    			set_input_value(input, /*field*/ ctx[0].value);
    			append_dev(div, t6);
    			mount_component(errors, div, null);
    			insert_dev(target, t7, anchor);
    			mount_component(help, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[5]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[5]),
    					listen_dev(input, "blur", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*field*/ 1) && t2_value !== (t2_value = /*field*/ ctx[0].value + "")) set_data_dev(t2, t2_value);

    			if (/*field*/ ctx[0].params.unit !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(label, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);

    			if (!current || dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].name)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_name_value !== (input_name_value = /*field*/ ctx[0].name)) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_min_value !== (input_min_value = /*field*/ ctx[0].params.min)) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_max_value !== (input_max_value = /*field*/ ctx[0].params.max)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_step_value !== (input_step_value = /*field*/ ctx[0].params.step)) {
    				attr_dev(input, "step", input_step_value);
    			}

    			if (dirty & /*field*/ 1) {
    				set_input_value(input, /*field*/ ctx[0].value);
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div_class_value !== (div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			destroy_component(helpicon);
    			destroy_component(errors);
    			if (detaching) detach_dev(t7);
    			destroy_component(help, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Range', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-range'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Range> was created with unknown prop '${key}'`);
    	});

    	function input_change_input_handler() {
    		field.value = to_number(this.value);
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [field, showHelp, classes, setValue, toggleHelp, input_change_input_handler];
    }

    class Range extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Range",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Range> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<Range>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Range>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/Checkbox.svelte generated by Svelte v3.42.1 */
    const file$7 = "src/Components/Inputs/Checkbox.svelte";

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let label;
    	let input;
    	let input_name_value;
    	let input_placeholder_value;
    	let input_aria_describedby_value;
    	let t0;
    	let t1_value = /*field*/ ctx[0].label + "";
    	let t1;
    	let t2;
    	let helpicon;
    	let label_for_value;
    	let t3;
    	let errors;
    	let div1_class_value;
    	let t4;
    	let help;
    	let current;
    	let mounted;
    	let dispose;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			create_component(helpicon.$$.fragment);
    			t3 = space();
    			create_component(errors.$$.fragment);
    			t4 = space();
    			create_component(help.$$.fragment);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", input_name_value = /*field*/ ctx[0].name);
    			attr_dev(input, "placeholder", input_placeholder_value = /*field*/ ctx[0].placeholder);

    			attr_dev(input, "aria-describedby", input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			add_location(input, file$7, 24, 12, 674);
    			attr_dev(label, "for", label_for_value = /*field*/ ctx[0].name);
    			add_location(label, file$7, 23, 8, 637);
    			attr_dev(div0, "class", "input-checkbox-field");
    			add_location(div0, file$7, 22, 4, 594);
    			attr_dev(div1, "class", div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div1, file$7, 21, 0, 540);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(label, input);
    			input.checked = /*field*/ ctx[0].value;
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			mount_component(helpicon, label, null);
    			append_dev(div1, t3);
    			mount_component(errors, div1, null);
    			insert_dev(target, t4, anchor);
    			mount_component(help, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[5]),
    					listen_dev(input, "blur", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*field*/ 1 && input_name_value !== (input_name_value = /*field*/ ctx[0].name)) {
    				attr_dev(input, "name", input_name_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_placeholder_value !== (input_placeholder_value = /*field*/ ctx[0].placeholder)) {
    				attr_dev(input, "placeholder", input_placeholder_value);
    			}

    			if (!current || dirty & /*field*/ 1 && input_aria_describedby_value !== (input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(input, "aria-describedby", input_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1) {
    				input.checked = /*field*/ ctx[0].value;
    			}

    			if ((!current || dirty & /*field*/ 1) && t1_value !== (t1_value = /*field*/ ctx[0].label + "")) set_data_dev(t1, t1_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);

    			if (!current || dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].name)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div1_class_value !== (div1_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(helpicon);
    			destroy_component(errors);
    			if (detaching) detach_dev(t4);
    			destroy_component(help, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkbox', slots, []);
    	
    	let { field } = $$props;

    	if (field.value == undefined) {
    		field.value = false;
    	}

    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-checkbox'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Checkbox> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		field.value = this.checked;
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [field, showHelp, classes, setValue, toggleHelp, input_change_handler];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<Checkbox> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/ChoiceSelect.svelte generated by Svelte v3.42.1 */
    const file$6 = "src/Components/Inputs/ChoiceSelect.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (25:8) {#each field.choices as choice}
    function create_each_block$4(ctx) {
    	let option;
    	let t_value = /*choice*/ ctx[7].label + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*choice*/ ctx[7].value;
    			option.value = option.__value;
    			add_location(option, file$6, 25, 12, 850);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1 && t_value !== (t_value = /*choice*/ ctx[7].label + "")) set_data_dev(t, t_value);

    			if (dirty & /*field*/ 1 && option_value_value !== (option_value_value = /*choice*/ ctx[7].value)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(25:8) {#each field.choices as choice}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let label;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let helpicon;
    	let label_for_value;
    	let t2;
    	let select;
    	let select_name_value;
    	let select_aria_describedby_value;
    	let t3;
    	let errors;
    	let div_class_value;
    	let t4;
    	let help;
    	let current;
    	let mounted;
    	let dispose;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);
    	let each_value = /*field*/ ctx[0].choices;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(helpicon.$$.fragment);
    			t2 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			create_component(errors.$$.fragment);
    			t4 = space();
    			create_component(help.$$.fragment);
    			attr_dev(label, "for", label_for_value = /*field*/ ctx[0].name);
    			add_location(label, file$6, 19, 4, 530);
    			attr_dev(select, "name", select_name_value = /*field*/ ctx[0].name);

    			attr_dev(select, "aria-describedby", select_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			if (/*field*/ ctx[0].value === void 0) add_render_callback(() => /*select_change_handler*/ ctx[5].call(select));
    			add_location(select, file$6, 23, 4, 656);
    			attr_dev(div, "class", div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div, file$6, 18, 0, 486);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(label, t0);
    			append_dev(label, t1);
    			mount_component(helpicon, label, null);
    			append_dev(div, t2);
    			append_dev(div, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*field*/ ctx[0].value);
    			append_dev(div, t3);
    			mount_component(errors, div, null);
    			insert_dev(target, t4, anchor);
    			mount_component(help, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[5]),
    					listen_dev(select, "blur", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);

    			if (!current || dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].name)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			if (dirty & /*field*/ 1) {
    				each_value = /*field*/ ctx[0].choices;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*field*/ 1 && select_name_value !== (select_name_value = /*field*/ ctx[0].name)) {
    				attr_dev(select, "name", select_name_value);
    			}

    			if (!current || dirty & /*field*/ 1 && select_aria_describedby_value !== (select_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(select, "aria-describedby", select_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1) {
    				select_option(select, /*field*/ ctx[0].value);
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div_class_value !== (div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(helpicon);
    			destroy_each(each_blocks, detaching);
    			destroy_component(errors);
    			if (detaching) detach_dev(t4);
    			destroy_component(help, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChoiceSelect', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-choice-select'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChoiceSelect> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		field.value = select_value(this);
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [field, showHelp, classes, setValue, toggleHelp, select_change_handler];
    }

    class ChoiceSelect extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChoiceSelect",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<ChoiceSelect> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<ChoiceSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<ChoiceSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/ChoiceRadio.svelte generated by Svelte v3.42.1 */
    const file$5 = "src/Components/Inputs/ChoiceRadio.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (22:0) {#if field.label !== undefined}
    function create_if_block$5(ctx) {
    	let legend;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let helpicon;
    	let current;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	const block = {
    		c: function create() {
    			legend = element("legend");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(helpicon.$$.fragment);
    			add_location(legend, file$5, 22, 4, 614);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, legend, anchor);
    			append_dev(legend, t0);
    			append_dev(legend, t1);
    			mount_component(helpicon, legend, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(legend);
    			destroy_component(helpicon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(22:0) {#if field.label !== undefined}",
    		ctx
    	});

    	return block;
    }

    // (30:4) {#each field.choices as choice}
    function create_each_block$3(ctx) {
    	let label;
    	let input;
    	let input_value_value;
    	let input_aria_describedby_value;
    	let t0;
    	let t1_value = /*choice*/ ctx[8].label + "";
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(input, "type", "radio");
    			input.__value = input_value_value = /*choice*/ ctx[8].value;
    			input.value = input.__value;

    			attr_dev(input, "aria-describedby", input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			/*$$binding_groups*/ ctx[6][0].push(input);
    			add_location(input, file$5, 31, 12, 834);
    			attr_dev(label, "class", "svelte-1251773");
    			add_location(label, file$5, 30, 8, 814);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*field*/ ctx[0].value;
    			append_dev(label, t0);
    			append_dev(label, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[5]),
    					listen_dev(input, "change", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1 && input_value_value !== (input_value_value = /*choice*/ ctx[8].value)) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*field*/ 1 && input_aria_describedby_value !== (input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(input, "aria-describedby", input_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1) {
    				input.checked = input.__value === /*field*/ ctx[0].value;
    			}

    			if (dirty & /*field*/ 1 && t1_value !== (t1_value = /*choice*/ ctx[8].label + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[6][0].splice(/*$$binding_groups*/ ctx[6][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(30:4) {#each field.choices as choice}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let errors;
    	let div_class_value;
    	let t2;
    	let help;
    	let current;
    	let if_block = /*field*/ ctx[0].label !== undefined && create_if_block$5(ctx);
    	let each_value = /*field*/ ctx[0].choices;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	errors = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(errors.$$.fragment);
    			t2 = space();
    			create_component(help.$$.fragment);
    			attr_dev(div, "class", div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div, file$5, 28, 0, 728);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t1);
    			mount_component(errors, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(help, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*field*/ ctx[0].label !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*field*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*field, undefined, setValue*/ 9) {
    				each_value = /*field*/ ctx[0].choices;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const errors_changes = {};
    			if (dirty & /*field*/ 1) errors_changes.field = /*field*/ ctx[0];
    			errors.$set(errors_changes);

    			if (!current || dirty & /*field*/ 1 && div_class_value !== (div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(errors.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(errors.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			destroy_component(errors);
    			if (detaching) detach_dev(t2);
    			destroy_component(help, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChoiceRadio', slots, []);
    	
    	let { field } = $$props;
    	const dispatch = createEventDispatcher();
    	let classes = ['input', 'input-text'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);

    		if (field.params.setNextFieldset) {
    			field.fieldset.form.navigation.nextFieldset();
    		}
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChoiceRadio> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		field.value = this.__value;
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			field.getValidationErors();
    		}
    	};

    	return [
    		field,
    		showHelp,
    		classes,
    		setValue,
    		toggleHelp,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class ChoiceRadio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChoiceRadio",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<ChoiceRadio> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<ChoiceRadio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<ChoiceRadio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Inputs/ChoiceImage.svelte generated by Svelte v3.42.1 */
    const file$4 = "src/Components/Inputs/ChoiceImage.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (22:0) {#if field.label !== undefined}
    function create_if_block$4(ctx) {
    	let legend;
    	let t0_value = /*field*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let helpicon;
    	let current;

    	helpicon = new HelpIcon({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	helpicon.$on("toggleHelp", /*toggleHelp*/ ctx[4]);

    	const block = {
    		c: function create() {
    			legend = element("legend");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(helpicon.$$.fragment);
    			add_location(legend, file$4, 22, 4, 629);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, legend, anchor);
    			append_dev(legend, t0);
    			append_dev(legend, t1);
    			mount_component(helpicon, legend, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*field*/ 1) && t0_value !== (t0_value = /*field*/ ctx[0].label + "")) set_data_dev(t0, t0_value);
    			const helpicon_changes = {};
    			if (dirty & /*field*/ 1) helpicon_changes.field = /*field*/ ctx[0];
    			helpicon.$set(helpicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helpicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helpicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(legend);
    			destroy_component(helpicon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(22:0) {#if field.label !== undefined}",
    		ctx
    	});

    	return block;
    }

    // (30:4) {#each field.choices as choice}
    function create_each_block$2(ctx) {
    	let label;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let input;
    	let input_value_value;
    	let input_aria_describedby_value;
    	let t1;
    	let div;
    	let t2_value = /*choice*/ ctx[9].label + "";
    	let t2;
    	let label_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			img = element("img");
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			div = element("div");
    			t2 = text(t2_value);
    			if (!src_url_equal(img.src, img_src_value = /*choice*/ ctx[9].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*choice*/ ctx[9].label);
    			add_location(img, file$4, 31, 12, 903);
    			attr_dev(input, "type", "radio");
    			input.__value = input_value_value = /*choice*/ ctx[9].value;
    			input.value = input.__value;

    			attr_dev(input, "aria-describedby", input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '');

    			attr_dev(input, "class", "svelte-wryltr");
    			/*$$binding_groups*/ ctx[6][0].push(input);
    			add_location(input, file$4, 32, 12, 961);
    			attr_dev(div, "class", "image-text");
    			add_location(div, file$4, 33, 12, 1132);

    			attr_dev(label, "class", label_class_value = "" + (null_to_empty(/*choice*/ ctx[9].value === /*field*/ ctx[0].value
    			? 'selected'
    			: '') + " svelte-wryltr"));

    			add_location(label, file$4, 30, 8, 827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, img);
    			append_dev(label, t0);
    			append_dev(label, input);
    			input.checked = input.__value === /*field*/ ctx[0].value;
    			append_dev(label, t1);
    			append_dev(label, div);
    			append_dev(div, t2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[5]),
    					listen_dev(input, "change", /*setValue*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*field*/ 1 && !src_url_equal(img.src, img_src_value = /*choice*/ ctx[9].image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*field*/ 1 && img_alt_value !== (img_alt_value = /*choice*/ ctx[9].label)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*field*/ 1 && input_value_value !== (input_value_value = /*choice*/ ctx[9].value)) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*field*/ 1 && input_aria_describedby_value !== (input_aria_describedby_value = /*field*/ ctx[0].help !== undefined
    			? /*field*/ ctx[0].name + '-help'
    			: '')) {
    				attr_dev(input, "aria-describedby", input_aria_describedby_value);
    			}

    			if (dirty & /*field*/ 1) {
    				input.checked = input.__value === /*field*/ ctx[0].value;
    			}

    			if (dirty & /*field*/ 1 && t2_value !== (t2_value = /*choice*/ ctx[9].label + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*field*/ 1 && label_class_value !== (label_class_value = "" + (null_to_empty(/*choice*/ ctx[9].value === /*field*/ ctx[0].value
    			? 'selected'
    			: '') + " svelte-wryltr"))) {
    				attr_dev(label, "class", label_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[6][0].splice(/*$$binding_groups*/ ctx[6][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(30:4) {#each field.choices as choice}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let errors_1;
    	let div_class_value;
    	let t2;
    	let help;
    	let current;
    	let if_block = /*field*/ ctx[0].label !== undefined && create_if_block$4(ctx);
    	let each_value = /*field*/ ctx[0].choices;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	errors_1 = new Errors({
    			props: { field: /*field*/ ctx[0] },
    			$$inline: true
    		});

    	help = new Help({
    			props: {
    				field: /*field*/ ctx[0],
    				show: /*showHelp*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(errors_1.$$.fragment);
    			t2 = space();
    			create_component(help.$$.fragment);
    			attr_dev(div, "class", div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]));
    			add_location(div, file$4, 28, 0, 743);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t1);
    			mount_component(errors_1, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(help, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*field*/ ctx[0].label !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*field*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*field, undefined, setValue*/ 9) {
    				each_value = /*field*/ ctx[0].choices;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const errors_1_changes = {};
    			if (dirty & /*field*/ 1) errors_1_changes.field = /*field*/ ctx[0];
    			errors_1.$set(errors_1_changes);

    			if (!current || dirty & /*field*/ 1 && div_class_value !== (div_class_value = /*field*/ ctx[0].getClasses(/*classes*/ ctx[2]))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			const help_changes = {};
    			if (dirty & /*field*/ 1) help_changes.field = /*field*/ ctx[0];
    			if (dirty & /*showHelp*/ 2) help_changes.show = /*showHelp*/ ctx[1];
    			help.$set(help_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(errors_1.$$.fragment, local);
    			transition_in(help.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(errors_1.$$.fragment, local);
    			transition_out(help.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			destroy_component(errors_1);
    			if (detaching) detach_dev(t2);
    			destroy_component(help, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let errors;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChoiceImage', slots, []);
    	
    	let { field } = $$props;
    	let dispatch = createEventDispatcher();
    	let classes = ['input', 'input-choice-image'];

    	const setValue = () => {
    		dispatch('update', field.fieldset.form);

    		if (field.params.setNextFieldset) {
    			field.fieldset.form.navigation.nextFieldset();
    		}
    	};

    	let showHelp = false;

    	const toggleHelp = () => {
    		$$invalidate(1, showHelp = !showHelp);
    	};

    	const writable_props = ['field'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChoiceImage> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		field.value = this.__value;
    		$$invalidate(0, field);
    	}

    	$$self.$$set = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Help,
    		HelpIcon,
    		Errors,
    		field,
    		dispatch,
    		classes,
    		setValue,
    		showHelp,
    		toggleHelp,
    		errors
    	});

    	$$self.$inject_state = $$props => {
    		if ('field' in $$props) $$invalidate(0, field = $$props.field);
    		if ('dispatch' in $$props) dispatch = $$props.dispatch;
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    		if ('showHelp' in $$props) $$invalidate(1, showHelp = $$props.showHelp);
    		if ('errors' in $$props) errors = $$props.errors;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*field*/ 1) {
    			errors = field.getValidationErors();
    		}
    	};

    	return [
    		field,
    		showHelp,
    		classes,
    		setValue,
    		toggleHelp,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class ChoiceImage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { field: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChoiceImage",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*field*/ ctx[0] === undefined && !('field' in props)) {
    			console.warn("<ChoiceImage> was created without expected prop 'field'");
    		}
    	}

    	get field() {
    		throw new Error("<ChoiceImage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set field(value) {
    		throw new Error("<ChoiceImage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    /* src/Components/Percentage.svelte generated by Svelte v3.42.1 */
    const file$3 = "src/Components/Percentage.svelte";

    // (18:4) {#if text === true}
    function create_if_block$3(ctx) {
    	let div;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(/*percentage*/ ctx[0]);
    			t1 = text("%");
    			attr_dev(div, "class", "percentage-text svelte-h0i7g2");
    			set_style(div, "height", /*height*/ ctx[2] + ": color " + /*textColor*/ ctx[6]);
    			add_location(div, file$3, 18, 8, 577);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*percentage*/ 1) set_data_dev(t0, /*percentage*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(18:4) {#if text === true}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let if_block = /*text*/ ctx[5] === true && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "percentage-bar svelte-h0i7g2");
    			set_style(div0, "width", /*$barSize*/ ctx[1] + "%");
    			set_style(div0, "height", /*height*/ ctx[2]);
    			set_style(div0, "background-color", /*color*/ ctx[3]);
    			add_location(div0, file$3, 16, 4, 442);
    			attr_dev(div1, "class", "percentage svelte-h0i7g2");
    			set_style(div1, "height", /*height*/ ctx[2]);
    			set_style(div1, "line-height", /*height*/ ctx[2]);
    			set_style(div1, "background-color", /*bgColor*/ ctx[4]);
    			add_location(div1, file$3, 15, 0, 336);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);
    			if (if_block) if_block.m(div1, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$barSize*/ 2) {
    				set_style(div0, "width", /*$barSize*/ ctx[1] + "%");
    			}

    			if (/*text*/ ctx[5] === true) if_block.p(ctx, dirty);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $barSize;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Percentage', slots, []);
    	let { start } = $$props;
    	let { percentage } = $$props;
    	let height = '5px';
    	let color = '#41a62a';
    	let bgColor = '#f3efe9';
    	let text = false;
    	let textColor = '#FFFFFF';
    	const barSize = tweened(start, { delay: 1000 });
    	validate_store(barSize, 'barSize');
    	component_subscribe($$self, barSize, value => $$invalidate(1, $barSize = value));
    	const writable_props = ['start', 'percentage'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Percentage> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('start' in $$props) $$invalidate(8, start = $$props.start);
    		if ('percentage' in $$props) $$invalidate(0, percentage = $$props.percentage);
    	};

    	$$self.$capture_state = () => ({
    		tweened,
    		start,
    		percentage,
    		height,
    		color,
    		bgColor,
    		text,
    		textColor,
    		barSize,
    		$barSize
    	});

    	$$self.$inject_state = $$props => {
    		if ('start' in $$props) $$invalidate(8, start = $$props.start);
    		if ('percentage' in $$props) $$invalidate(0, percentage = $$props.percentage);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('bgColor' in $$props) $$invalidate(4, bgColor = $$props.bgColor);
    		if ('text' in $$props) $$invalidate(5, text = $$props.text);
    		if ('textColor' in $$props) $$invalidate(6, textColor = $$props.textColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*percentage*/ 1) {
    			barSize.set(percentage);
    		}
    	};

    	return [percentage, $barSize, height, color, bgColor, text, textColor, barSize, start];
    }

    class Percentage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { start: 8, percentage: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Percentage",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*start*/ ctx[8] === undefined && !('start' in props)) {
    			console.warn("<Percentage> was created without expected prop 'start'");
    		}

    		if (/*percentage*/ ctx[0] === undefined && !('percentage' in props)) {
    			console.warn("<Percentage> was created without expected prop 'percentage'");
    		}
    	}

    	get start() {
    		throw new Error("<Percentage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set start(value) {
    		throw new Error("<Percentage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get percentage() {
    		throw new Error("<Percentage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set percentage(value) {
    		throw new Error("<Percentage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Fieldset.svelte generated by Svelte v3.42.1 */
    const file$2 = "src/Components/Fieldset.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (35:4) {#if fieldset.percentage !== undefined}
    function create_if_block_9(ctx) {
    	let percentage;
    	let current;

    	percentage = new Percentage({
    			props: {
    				start: /*percentageStart*/ ctx[1],
    				percentage: /*percentageCurrent*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(percentage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(percentage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const percentage_changes = {};
    			if (dirty & /*percentageStart*/ 2) percentage_changes.start = /*percentageStart*/ ctx[1];
    			percentage.$set(percentage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(percentage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(percentage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(percentage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(35:4) {#if fieldset.percentage !== undefined}",
    		ctx
    	});

    	return block;
    }

    // (56:49) 
    function create_if_block_8(ctx) {
    	let p;
    	let t_value = /*field*/ ctx[6].getValue() + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$2, 56, 16, 2363);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fields*/ 4 && t_value !== (t_value = /*field*/ ctx[6].getValue() + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(56:49) ",
    		ctx
    	});

    	return block;
    }

    // (54:48) 
    function create_if_block_7(ctx) {
    	let h2;
    	let t_value = /*field*/ ctx[6].getValue() + "";
    	let t;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t = text(t_value);
    			add_location(h2, file$2, 54, 16, 2269);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fields*/ 4 && t_value !== (t_value = /*field*/ ctx[6].getValue() + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(54:48) ",
    		ctx
    	});

    	return block;
    }

    // (52:51) 
    function create_if_block_6(ctx) {
    	let choiceimage;
    	let current;

    	choiceimage = new ChoiceImage({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	choiceimage.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(choiceimage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(choiceimage, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const choiceimage_changes = {};
    			if (dirty & /*fields*/ 4) choiceimage_changes.field = /*field*/ ctx[6];
    			choiceimage.$set(choiceimage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(choiceimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(choiceimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(choiceimage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(52:51) ",
    		ctx
    	});

    	return block;
    }

    // (50:51) 
    function create_if_block_5(ctx) {
    	let choiceradio;
    	let current;

    	choiceradio = new ChoiceRadio({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	choiceradio.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(choiceradio.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(choiceradio, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const choiceradio_changes = {};
    			if (dirty & /*fields*/ 4) choiceradio_changes.field = /*field*/ ctx[6];
    			choiceradio.$set(choiceradio_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(choiceradio.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(choiceradio.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(choiceradio, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(50:51) ",
    		ctx
    	});

    	return block;
    }

    // (48:52) 
    function create_if_block_4(ctx) {
    	let choiceselect;
    	let current;

    	choiceselect = new ChoiceSelect({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	choiceselect.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(choiceselect.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(choiceselect, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const choiceselect_changes = {};
    			if (dirty & /*fields*/ 4) choiceselect_changes.field = /*field*/ ctx[6];
    			choiceselect.$set(choiceselect_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(choiceselect.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(choiceselect.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(choiceselect, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(48:52) ",
    		ctx
    	});

    	return block;
    }

    // (46:48) 
    function create_if_block_3(ctx) {
    	let checkbox;
    	let current;

    	checkbox = new Checkbox({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	checkbox.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkbox_changes = {};
    			if (dirty & /*fields*/ 4) checkbox_changes.field = /*field*/ ctx[6];
    			checkbox.$set(checkbox_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(46:48) ",
    		ctx
    	});

    	return block;
    }

    // (44:45) 
    function create_if_block_2(ctx) {
    	let range;
    	let current;

    	range = new Range({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	range.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(range.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(range, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const range_changes = {};
    			if (dirty & /*fields*/ 4) range_changes.field = /*field*/ ctx[6];
    			range.$set(range_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(range.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(range.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(range, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(44:45) ",
    		ctx
    	});

    	return block;
    }

    // (42:48) 
    function create_if_block_1$2(ctx) {
    	let textarea;
    	let current;

    	textarea = new Textarea({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	textarea.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(textarea.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textarea, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textarea_changes = {};
    			if (dirty & /*fields*/ 4) textarea_changes.field = /*field*/ ctx[6];
    			textarea.$set(textarea_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textarea, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(42:48) ",
    		ctx
    	});

    	return block;
    }

    // (40:12) {#if field.type === 'Text'}
    function create_if_block$2(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: { field: /*field*/ ctx[6] },
    			$$inline: true
    		});

    	text_1.$on("update", /*update*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};
    			if (dirty & /*fields*/ 4) text_1_changes.field = /*field*/ ctx[6];
    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(40:12) {#if field.type === 'Text'}",
    		ctx
    	});

    	return block;
    }

    // (39:8) {#each fields as field}
    function create_each_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block$2,
    		create_if_block_1$2,
    		create_if_block_2,
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_if_block_6,
    		create_if_block_7,
    		create_if_block_8
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*field*/ ctx[6].type === 'Text') return 0;
    		if (/*field*/ ctx[6].type === 'TextArea') return 1;
    		if (/*field*/ ctx[6].type === 'Range') return 2;
    		if (/*field*/ ctx[6].type === 'Checkbox') return 3;
    		if (/*field*/ ctx[6].type === 'ChoiceSelect') return 4;
    		if (/*field*/ ctx[6].type === 'ChoiceRadio') return 5;
    		if (/*field*/ ctx[6].type === 'ChoiceImage') return 6;
    		if (/*field*/ ctx[6].type === 'Headline') return 7;
    		if (/*field*/ ctx[6].type === 'Paragraph') return 8;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(39:8) {#each fields as field}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let fieldset_1;
    	let legend;
    	let t0_value = /*fieldset*/ ctx[0].label + "";
    	let t0;
    	let t1;
    	let t2;
    	let div;
    	let div_class_value;
    	let fieldset_1_class_value;
    	let fieldset_1_intro;
    	let current;
    	let if_block = /*fieldset*/ ctx[0].percentage !== undefined && create_if_block_9(ctx);
    	let each_value = /*fields*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			fieldset_1 = element("fieldset");
    			legend = element("legend");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(legend, file$2, 33, 4, 1164);
    			attr_dev(div, "class", div_class_value = "fields " + /*fieldset*/ ctx[0].getFieldsClasses());
    			add_location(div, file$2, 37, 4, 1334);
    			attr_dev(fieldset_1, "class", fieldset_1_class_value = /*fieldset*/ ctx[0].getClasses());
    			add_location(fieldset_1, file$2, 32, 0, 1111);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, fieldset_1, anchor);
    			append_dev(fieldset_1, legend);
    			append_dev(legend, t0);
    			append_dev(fieldset_1, t1);
    			if (if_block) if_block.m(fieldset_1, null);
    			append_dev(fieldset_1, t2);
    			append_dev(fieldset_1, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*fieldset*/ 1) && t0_value !== (t0_value = /*fieldset*/ ctx[0].label + "")) set_data_dev(t0, t0_value);

    			if (/*fieldset*/ ctx[0].percentage !== undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*fieldset*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_9(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(fieldset_1, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*fields, update*/ 12) {
    				each_value = /*fields*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*fieldset*/ 1 && div_class_value !== (div_class_value = "fields " + /*fieldset*/ ctx[0].getFieldsClasses())) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*fieldset*/ 1 && fieldset_1_class_value !== (fieldset_1_class_value = /*fieldset*/ ctx[0].getClasses())) {
    				attr_dev(fieldset_1, "class", fieldset_1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			if (!fieldset_1_intro) {
    				add_render_callback(() => {
    					fieldset_1_intro = create_in_transition(fieldset_1, fade, {});
    					fieldset_1_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset_1);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let fields;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fieldset', slots, []);
    	
    	let { fieldset } = $$props;
    	const dispatch = createEventDispatcher();

    	function update(form) {
    		dispatch('update', form.detail);
    	}

    	let percentageStart;

    	switch (fieldset.form.navigation.getLastAction()) {
    		case 'prev':
    			percentageStart = fieldset.form.navigation.getNextFieldset().percentage;
    			break;
    		case 'next':
    			percentageStart = fieldset.form.navigation.getPrevFieldset().percentage;
    			break;
    		default:
    			percentageStart = 0;
    			break;
    	}

    	let percentageCurrent = fieldset.form.navigation.getCurrentFieldset().percentage;
    	const writable_props = ['fieldset'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fieldset> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('fieldset' in $$props) $$invalidate(0, fieldset = $$props.fieldset);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fade,
    		Text,
    		Textarea,
    		Range,
    		Checkbox,
    		ChoiceSelect,
    		ChoiceRadio,
    		ChoiceImage,
    		Percentage,
    		fieldset,
    		dispatch,
    		update,
    		percentageStart,
    		percentageCurrent,
    		fields
    	});

    	$$self.$inject_state = $$props => {
    		if ('fieldset' in $$props) $$invalidate(0, fieldset = $$props.fieldset);
    		if ('percentageStart' in $$props) $$invalidate(1, percentageStart = $$props.percentageStart);
    		if ('percentageCurrent' in $$props) $$invalidate(4, percentageCurrent = $$props.percentageCurrent);
    		if ('fields' in $$props) $$invalidate(2, fields = $$props.fields);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*fieldset*/ 1) {
    			$$invalidate(2, fields = fieldset.fields);
    		}
    	};

    	return [fieldset, percentageStart, fields, update, percentageCurrent];
    }

    class Fieldset extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { fieldset: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fieldset",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*fieldset*/ ctx[0] === undefined && !('fieldset' in props)) {
    			console.warn("<Fieldset> was created without expected prop 'fieldset'");
    		}
    	}

    	get fieldset() {
    		throw new Error("<Fieldset>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fieldset(value) {
    		throw new Error("<Fieldset>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Navigation.svelte generated by Svelte v3.42.1 */
    const file$1 = "src/Components/Navigation.svelte";

    // (22:4) {#if ! disabledPrev }
    function create_if_block_1$1(ctx) {
    	let button;
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text("Zurück");
    			button.disabled = /*disabledPrev*/ ctx[1];
    			add_location(button, file$1, 22, 4, 606);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*disabledPrev*/ 2) {
    				prop_dev(button, "disabled", /*disabledPrev*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(22:4) {#if ! disabledPrev }",
    		ctx
    	});

    	return block;
    }

    // (25:4) {#if ! disabledNext }
    function create_if_block$1(ctx) {
    	let button;
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text("Weiter");
    			button.disabled = /*disabledNext*/ ctx[0];
    			add_location(button, file$1, 25, 4, 734);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*disabledNext*/ 1) {
    				prop_dev(button, "disabled", /*disabledNext*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(25:4) {#if ! disabledNext }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let nav;
    	let t;
    	let if_block0 = !/*disabledPrev*/ ctx[1] && create_if_block_1$1(ctx);
    	let if_block1 = !/*disabledNext*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			add_location(nav, file$1, 20, 0, 570);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			if (if_block0) if_block0.m(nav, null);
    			append_dev(nav, t);
    			if (if_block1) if_block1.m(nav, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*disabledPrev*/ ctx[1]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(nav, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*disabledNext*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(nav, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let disabledPrev;
    	let disabledNext;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navigation', slots, []);
    	
    	const dispatch = createEventDispatcher();
    	let { navigation } = $$props;

    	const navigate = direction => {
    		switch (direction) {
    			case 'prev':
    				navigation.prevFieldset();
    				dispatch('navigate', navigation.form);
    				break;
    			case 'next':
    				navigation.nextFieldset();
    				dispatch('navigate', navigation.form);
    				break;
    		}
    	};

    	const writable_props = ['navigation'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navigation> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => navigate('prev');
    	const click_handler_1 = () => navigate('next');

    	$$self.$$set = $$props => {
    		if ('navigation' in $$props) $$invalidate(3, navigation = $$props.navigation);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		navigation,
    		navigate,
    		disabledNext,
    		disabledPrev
    	});

    	$$self.$inject_state = $$props => {
    		if ('navigation' in $$props) $$invalidate(3, navigation = $$props.navigation);
    		if ('disabledNext' in $$props) $$invalidate(0, disabledNext = $$props.disabledNext);
    		if ('disabledPrev' in $$props) $$invalidate(1, disabledPrev = $$props.disabledPrev);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*navigation*/ 8) {
    			$$invalidate(1, disabledPrev = !navigation.hasPrevFieldset());
    		}

    		if ($$self.$$.dirty & /*navigation*/ 8) {
    			$$invalidate(0, disabledNext = !navigation.hasNextFieldset());
    		}
    	};

    	return [
    		disabledNext,
    		disabledPrev,
    		navigate,
    		navigation,
    		click_handler,
    		click_handler_1
    	];
    }

    class Navigation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { navigation: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navigation",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*navigation*/ ctx[3] === undefined && !('navigation' in props)) {
    			console.warn("<Navigation> was created without expected prop 'navigation'");
    		}
    	}

    	get navigation() {
    		throw new Error("<Navigation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set navigation(value) {
    		throw new Error("<Navigation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Form.svelte generated by Svelte v3.42.1 */
    const file = "src/Components/Form.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (19:8) {:else}
    function create_else_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("JSON data failure.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(19:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:12) {#if fieldset.name === form.navigation.getCurrentFieldset().name }
    function create_if_block_1(ctx) {
    	let fieldset;
    	let current;

    	fieldset = new Fieldset({
    			props: { fieldset: /*fieldset*/ ctx[5] },
    			$$inline: true
    		});

    	fieldset.$on("update", /*update*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(fieldset.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fieldset, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const fieldset_changes = {};
    			if (dirty & /*form*/ 1) fieldset_changes.fieldset = /*fieldset*/ ctx[5];
    			fieldset.$set(fieldset_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fieldset.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fieldset.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fieldset, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(16:12) {#if fieldset.name === form.navigation.getCurrentFieldset().name }",
    		ctx
    	});

    	return block;
    }

    // (15:8) {#each form.fieldsets as fieldset}
    function create_each_block(ctx) {
    	let show_if = /*fieldset*/ ctx[5].name === /*form*/ ctx[0].navigation.getCurrentFieldset().name;
    	let if_block_anchor;
    	let current;
    	let if_block = show_if && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*form*/ 1) show_if = /*fieldset*/ ctx[5].name === /*form*/ ctx[0].navigation.getCurrentFieldset().name;

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*form*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(15:8) {#each form.fieldsets as fieldset}",
    		ctx
    	});

    	return block;
    }

    // (23:4) {#if showNavbar}
    function create_if_block(ctx) {
    	let navigation;
    	let current;

    	navigation = new Navigation({
    			props: { navigation: /*form*/ ctx[0].navigation },
    			$$inline: true
    		});

    	navigation.$on("navigate", /*update*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(navigation.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navigation, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const navigation_changes = {};
    			if (dirty & /*form*/ 1) navigation_changes.navigation = /*form*/ ctx[0].navigation;
    			navigation.$set(navigation_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navigation.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navigation.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navigation, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(23:4) {#if showNavbar}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let form_1;
    	let div;
    	let t;
    	let form_1_name_value;
    	let form_1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*form*/ ctx[0].fieldsets;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    	}

    	let if_block = /*showNavbar*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			form_1 = element("form");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "fieldsets");
    			add_location(div, file, 13, 4, 354);
    			attr_dev(form_1, "name", form_1_name_value = /*form*/ ctx[0].name);
    			attr_dev(form_1, "class", form_1_class_value = /*form*/ ctx[0].getClasses());
    			add_location(form_1, file, 12, 0, 275);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form_1, anchor);
    			append_dev(form_1, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div, null);
    			}

    			append_dev(form_1, t);
    			if (if_block) if_block.m(form_1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form_1, "submit", prevent_default(/*submit_handler*/ ctx[4]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*form, update*/ 5) {
    				each_value = /*form*/ ctx[0].fieldsets;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block(ctx);
    					each_1_else.c();
    					each_1_else.m(div, null);
    				}
    			}

    			if (/*showNavbar*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*showNavbar*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(form_1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*form*/ 1 && form_1_name_value !== (form_1_name_value = /*form*/ ctx[0].name)) {
    				attr_dev(form_1, "name", form_1_name_value);
    			}

    			if (!current || dirty & /*form*/ 1 && form_1_class_value !== (form_1_class_value = /*form*/ ctx[0].getClasses())) {
    				attr_dev(form_1, "class", form_1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form_1);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let showNavbar;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, []);
    	
    	let { formData } = $$props;
    	let form = new Form(formData);

    	let update = e => {
    		$$invalidate(0, form = e.detail);
    	};

    	const writable_props = ['formData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	function submit_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('formData' in $$props) $$invalidate(3, formData = $$props.formData);
    	};

    	$$self.$capture_state = () => ({
    		Form,
    		Fieldset,
    		Navigation,
    		formData,
    		form,
    		update,
    		showNavbar
    	});

    	$$self.$inject_state = $$props => {
    		if ('formData' in $$props) $$invalidate(3, formData = $$props.formData);
    		if ('form' in $$props) $$invalidate(0, form = $$props.form);
    		if ('update' in $$props) $$invalidate(2, update = $$props.update);
    		if ('showNavbar' in $$props) $$invalidate(1, showNavbar = $$props.showNavbar);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(1, showNavbar = true);
    	return [form, showNavbar, update, formData, submit_handler];
    }

    class Form_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { formData: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form_1",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*formData*/ ctx[3] === undefined && !('formData' in props)) {
    			console.warn("<Form> was created without expected prop 'formData'");
    		}
    	}

    	get formData() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set formData(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var name="test-form";var start="projektadresse";var classes=["test-form"];var fieldsets=[{label:"Projektdaten",name:"projektadresse",nextFieldset:"basisdaten",fields:[{name:"email1",label:"Ihre Email-Adresse",type:"Text",classes:["w1of1"],required:true,validations:[{type:"email",error:"Email-Adresse ist ungültig"}]},{name:"email2",label:"Email wiederholen",type:"Text",classes:["w1of1"],required:true,validations:[{type:"email",error:"Email-Adresse ist ungültig"}]},{type:"Headline",value:"Adresse des Gebäudes"},{type:"Paragraph",value:"Machen Sie hier Angaben zum Gebäude, für das Sie den Energieausweis erstellen möchten."},{name:"street",label:"Straße und Hausnummer",type:"Text",classes:["w1of1"],required:true,validations:[{type:"string",error:"Der Angegebene Wert muss eine Zeichenkette sein"},{type:"minLength",value:3,error:"Mindestens 3 Zeichen"},{type:"maxLength",value:100,error:"Maximal 100 Zeichen"}]},{name:"zip",label:"Postleitzahl",classes:["w1of4"],type:"Text",required:true,validations:[{type:"string",error:"Postleitzahl ungültig"},{type:"minLength",value:5,error:"Eine Postleitzahl muss aus 5 Ziffern bestehen"},{type:"maxLength",value:5,error:"Eine Postleitzahl muss aus 5 Ziffern bestehen"}]},{name:"city",label:"Ort",type:"Text",classes:["w3of4"],required:true,validations:[{type:"string",error:"Der Angegebene Wert muss eine Zeichenkette sein"},{type:"minLength",value:3,error:"Mindestens 3 Zeichen"},{type:"maxLength",value:50,error:"Maximal 50 Zeichen"}]},{name:"state",label:"Bundesland",type:"ChoiceSelect",classes:["w1of1"],required:true,choices:[{label:"Bitte wählen..."},{label:"Bayern",value:"Bayern"},{label:"Berlin",value:"Berlin"},{label:"Hamburg",value:"Hamburg"},{label:"Hessen",value:"Hessen"},{label:"Nordrhein-Westfalen",value:"Nordrhein-Westfalen"},{label:"Meckelemburg-Vorpommern",value:"Meckelemburg-Vorpommern"},{label:"Saarland",value:"Saarland"}],validations:[{type:"empty",error:"Bitte wählen Sie ein Bundesland aus"}]},{name:"privacy",label:"Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.",type:"Checkbox",classes:["w1of1"],required:true,validations:[{type:"isChecked",error:"Sie müssen die Datenschutzerklärung lesen und aktzeptioeren bevor Sie fortfahren."}]},{name:"privacy",label:"Hiermit bestätige ich, dass Energieausweis-online-erstellen.de mich bei Fragen zu meinen Energieausweis-Angaben kontaktieren darf.",type:"Checkbox",classes:["w1of1"]}]},{label:"Basisdaten",name:"basisdaten",fields:[{name:"reason",label:"Grund der Erstellung des Energieausweises",type:"ChoiceSelect",classes:["w1of1"],required:true,choices:[{label:"Bitte wählen..."},{label:"Modernisierung / Erweiterung",value:"Modernisierung / Erweiterung"},{label:"Vermietung",value:"Vermietung"},{label:"Verkauf",value:"Verkauf"},{label:"Sonstiges",value:"Sonstiges"}]},{name:"reason",label:"Gebäudedaten",type:"ChoiceRadio",classes:["w1of1"],required:true,choices:[{label:"Bestand",value:"Bestand"},{label:"Neubau",value:"Neubau"}]}]}];var FormData = {name:name,start:start,classes:classes,fieldsets:fieldsets};

    /* src/App.svelte generated by Svelte v3.42.1 */

    function create_fragment(ctx) {
    	let form;
    	let current;

    	form = new Form_1({
    			props: { formData: FormData },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(form.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(form, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Form: Form_1, FormData });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
