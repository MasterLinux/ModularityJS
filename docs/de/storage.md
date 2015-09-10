#Storage
Das `Storage` wird zur Speicherung von Daten genutzt die über eine App Session hinaus leben müssen. Immer wenn ein Wert in das Storage geschrieben wird, wird es im `LocalStorage` persistiert. Siehe: [https://developer.mozilla.org/en-US/docs/Web/API/Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage "LocalStorage") 

Das Storage sollte daher nur für Daten genutzt werden die nach dem Beenden der Anwendung weiter vorhanden sein müssen, um diese bei einem erneuten Nutzen der Anwendung wieder her zu stellen.

Für alle anderen Fälle sollte ein `Cache` bevorzugt werden. 
> TODO: Cache Dokumenttion hinzufügen und verlinken

##Verwendung
###Storage erzeugen
Es gibt zwei Arten von Storages: 
1. Zum einen gibt es das `Immutable Storage`, welches es **nicht** erlaubt Werte zu **überschreiben**. So wird ein Fehler geworfen, falls ein Wert mit einem Key gespeichert werden soll, welcher schon im Storage vorhanden ist
2. Zum anderen gibt es ein `Mutable Storage`, bei dem Werte überschrieben werden dürfen 

```js
import {Storage} from "data/storage.js";

// Werte können nicht überschrieben werden
let immutableStorage = new Storage("my_id");

// Werte können überschrieben werden
let mutableStorage = new Storage("my_id", true);
```

###Storage wiederherstellen
Wenn ein Storage wiederhergestellt werden soll. Falls z.B. die App beendet wurde und bei einem erneuten Start der App die Daten wieder benötigt werden, kann die statische `getPersistentStorage` Funktion genutzt werden.

```js
// Stellt ein vorher persistiertes Storage wieder her
let storage = Storage.getPersistentStorage("my_id");
```

###Werte schreiben
Um Werte im Storage zu speichern wird die `write` Funktion genutzt.

```js
// Schreibt einen Wert mit dem Key "my_key" ins Storage
mutableStorage.write("my_key", 42);

// Überschreibt den vorherigen Wert mit 1337
mutableStorage.write("my_key", 1337);
```

Das Immutable Storage welches es nicht erlaubt Werte zu überschreiben, wirft einen Fehler beim Versuch einen Wert zu überscheiben. 
```js
// Schreibt einen Wert mit dem Key "my_key" ins Storage 
immutableStorage.write("my_key", "a string");

// Wirft einen Fehler, da es schon einen Wert mit dem Key "my_key" gibt und das Storage immutable ist
immutableStorage.write("my_key", 42);
```

####Achtung!
Nicht alle Werte werden im `LocalStorage` persistiert. So sollten folgende Datentypen nicht im Storage gespeichert werden:
* function
* undefined
* null
* NaN

###Werte lesen
Um Werte zu lesen wird die `read` Funktion genutzt. Falls ein Wert nicht existiert wird `undefined` zurück gegeben.
```js
// Liest einen Wert mit dem Key "my_key"
let value = mutableStorage.read("my_key");

// Gibt es den Wert nicht wird undefined zurück gegeben
let undefinedValue = mutableStorage.read("another_key");
```

###Werte löschen
Um Werte wieder zu löschen wird die `remove` Funktion genutzt. Falls es den Wert nicht gibt macht die Funktion nichts.

```js
// Löscht einen bestimmten Wert wieder
mutableStorage.remove("my_key");
```

###Überprüfen ob es einen bestimmten Wert gibt
Um zu prüfen ob ein bestimmter Wert im Storage vorhanden ist wird die `contains` Funktion genutzt.

```js
// Prüft ob ein bestimmter Wert vorhanden ist
if(mutableStorage.contains("my_key")) {
    console.log("value exists!");
}
``` 
