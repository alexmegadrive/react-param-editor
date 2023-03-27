# react-param-editor

Deploy - https://alexmegadrive.github.io/react-param-editor/

`npm i` for installing dependencies

`npm run dev` for running in localhost

- Для масштабируемости в параметры добавлен атрибут type для осуществления типизации (для возможности указания формата поля, текст/число/селектор)
- Рендер поля в HTML в соответствии с его типом
- Универсальный компонент handleChange настроен на работу со всеми типами полей
- В соответствии с ТЗ, реализация работает только с текстовыми параметрами, тип string
