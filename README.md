# use-intersection-observer 🚦🚦

### An intersection observer hook for all your purposes</h3>

<p  align="center">

<img  src="https://badgen.net/npm/v/@simbathesailor/use-intersection-observer">

<img  src="https://badgen.net/bundlephobia/minzip/@simbathesailor/use-intersection-observer">

<img  src="https://badgen.net/npm/dw/@simbathesailor/use-intersection-observer">

</p>

<p  align="center"><img  src="demo-images/demo.png"  width="300"  align="center"></p>

#### ✅ Built on new flashy Reactjs hooks.

#### ✅ No assumption on the elements you want to observe.

#### ✅ Completely configurable.

#### ✅ < 1kb gzipped

### Installing

If using npm:

```sh



npm i @simbathesailor/use-intersection-observer --save



```

If using yarn:

```sh



yarn add @simbathesailor/use-intersection-observer



```

## Demo

[Demo App](https://ywwpb.csb.app/)

[Full Codesandbox Code](https://codesandbox.io/s/useintersectionobserver-ywwpb)

## Usage

```jsx
import { useIntersectionObserver } from '@simbathesailor/use-intersection-observer';

const defaultVisibilityCondition = (entry: IntersectionObserverEntry) => {
  if (entry.intersectionRatio >= 1) {
    return true;
  }

  return false;
};

const defaultOptions = {
  rootMargin: '0px 0px 0px 0px',

  threshold: '0, 1',

  when: true,

  visibilityCondition: defaultVisibilityCondition,
};

const App = () => {
  const [isVisible, boxElemCallback, rootCallbackRef] = useIntersectionObserver(
    defaultOptions
  );

  return (
    <div className="App">
      <h1>See for the visibility of box at bottom of page</h1>

      <h2>Start scroling down to the visibility change!</h2>

      <div ref={boxElemCallback} className="box">
        {isVisible ? 'Box is visible' : 'Box is not visible'}
      </div>

      {isVisible ? 'Box is visible' : 'Box is not visible'}
    </div>
  );
};
```

## Props

| Props                       | IsMandatory | Type     | Default                                 | Description                                                                 |
| --------------------------- | ----------- | -------- | --------------------------------------- | --------------------------------------------------------------------------- |
| options.rootMargin          | No          | string   | '0px 0px 0px 0px'                       | rootMargin top, left, bottom, right                                         |
| options.threshold           | No          | string   | '0, 1'                                  | proportion of element intersecting required to trigger the callback         |
| options.when                | No          | boolean  | true                                    | The flag which which make the observer active or inactive.                  |
| options.visibilityCondition | No          | Function | (entry) => entry.intersectionRatio >= 1 | Return boolean. It sets visibility to true when this function returns true. |

## Return Data Types and Description

The hook returns an array. Let's say that array name is **Arr**.

| Index  | Name                   | Type     | Description                                                                               |
| ------ | ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| Arr[0] | isVisible              | boolean  | Tells whether the target element is visible or not                                        |
| Arr[1] | targetElementRef       | Function | The target element ref, add it to target element                                          |
| Arr[2] | rootElementCallbackRef | Function | The root element ref, add it to root element or can just leave it if document is the root |

## Concept

**Intersection Observer API** has a very good support across browsers . Here is the link for [MDN Intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#root-intersection-rectangle). You can read about it and understand why it is performant. And the best part is it has a polyfill also : [intersection observer polyfill](https://github.com/w3c/IntersectionObserver)

## Work to do

- TestCases.

* Other examples

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

[simbathesailor](https://github.com/simbathesailor)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<table><tr><td  align="center"><a  href="https://github.com/simbathesailor"><img  src="https://avatars2.githubusercontent.com/u/5938110?s=400&u=f94d3ad624faa17c799d7bbd88cf2d2170b26813&v=4"  width="100px;"  alt="Anil kumar chaudhary"/><br  /><sub><b>Anil kumar Chaudhary</b></sub></a><br  /><a  href="https://github.com/simbathesailor/use-intersection-observer/commits?author=simbathesailor"  title="Code">💻</a>  <a  href="#ideas-simbathesailor"  title="Ideas, Planning, & Feedback">🤔</a>  <a  href="#design-simbathesailor"  title="Design">🎨</a>  <a  href="https://github.com/simbathesailor/use-intersection-observer/commits?author=simbathesailor"  title="Documentation">📖</a>  <a  href="https://github.com/simbathesailor/use-intersection-observer/issues/created_by/simbathesailor"  title="Bug reports">🐛</a></td></tr></table>
