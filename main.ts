
let pasek: neopixel.Strip = neopixel.create(DigitalPin.P8, 15, NeoPixelMode.RGB)

// stisknutí loga
let logopressed: boolean = false

// pojistky
let insurancemin: number = 10
let insurancemax: number = 1000

// rotace
let rotate: number = 1

// ČÍSLO NA DIS
let sigmacislo: number = 0

// rychlost rotace
let speed: number = 1000

// zajištění tlačítek
let Apresstime: number = 0
let Bpresstime: number = 0

pasek.showRainbow(1, 360)

 // Rotace LED pásku
basic.forever(function () {
    pasek.rotate(rotate)
    pasek.show()
    basic.pause(speed)
})


basic.forever(function () {
    

// Zvýšení rychlosti tlačítkem A
    if (input.buttonIsPressed(Button.A) &&  speed >= insurancemin){
        if (Apresstime === 0) {
            Apresstime = control.millis()
        }
        if (control.millis() - Apresstime > 100 && speed > insurancemin){
           speed -= 100
           sigmacislo += 10
        } else if (control.millis() - Apresstime < 400 && speed > insurancemin){
            speed -= 10
            sigmacislo += 1
            
        }
    }
// reset času zmáčknutí A
    if (!input.buttonIsPressed(Button.A)){
        Apresstime = 0
    }

// Snížení rychlosti tlačítkem B
    if (input.buttonIsPressed(Button.B) && speed < insurancemax){
        if (Bpresstime === 0) {
            Bpresstime = control.millis()
        }
    if(control.millis() - Bpresstime > 400){
        speed += 100
        sigmacislo -= 10
        
    } else if (control.millis() - Bpresstime < 400 && speed < insurancemax){
        speed += 10
        sigmacislo -= 1
    }
   }
// reset času zmáčknutí B
    if (!input.buttonIsPressed(Button.B)){
        Bpresstime = 0
    }

// další pojistky

if(speed > insurancemax){
    speed = insurancemax
}

if(speed <= insurancemin){
    speed = insurancemin
}

if(sigmacislo > 99){
    sigmacislo = 99
}

if(sigmacislo < 0){
    sigmacislo = 0
}

// Změna směru rotace při stisknutí loga
    if (input.logoIsPressed() && !logopressed) {
        rotate = rotate * -1  // Změna směru
        logopressed = true  // Nastaví stav jako "logo bylo zmáčknuto"
    }
    if (!input.logoIsPressed() && logopressed) {
        logopressed = false  // Resetuje stav, když logo není stisknuto
    }
    // číslo na dis
whaleysans.showNumber(sigmacislo)

})