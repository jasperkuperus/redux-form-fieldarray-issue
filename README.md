# Redux Form FieldArray unmount issue

## Getting started

```
yarn install
yarn start
```

Now visit [http://localhost:1234/](http://localhost:1234/) and open the console.

## Scenarios

### Scenario 1

* Tap a few times on the first swap button.

You'll see that on each tap the component in the `FieldArray` is unmounted.

### Scenario 2

* Tap repeatedly on a random button

You'll see a couple of re-mounts, but after a while there will be no more re-mounting.

### Scenario 3

* Edit the list name (You'll see a re-mount)
* Tap the first swap button (You'll see another re-mount)
* Now just go bananas, you won't see a re-mount anymore. Try anything...
