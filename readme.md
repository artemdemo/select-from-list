# Select from list

http://www.json-generator.com/#

```
[
  '{{repeat(50)}}',
  {
    _id: '{{objectId()}}',
    name: '{{company()}} {{company().toLowerCase()}}',
    data: '{{integer(1, 999)}}-{{integer(1, 99999)}}.{{integer(10, 99)}}'
  }
]
```

