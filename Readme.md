### Play store
---

- Create a file at:
```
 android\app\upload.keystore.properties
```

- Provide valid keys 
```
key.store=your-keystore
key.alias=your-keystore-alias
key.store.password=your-keystore-password
key.alias.password=your-keystore-alias-password
```

- bundle your aab

```
./gradlew bundleRelease
```