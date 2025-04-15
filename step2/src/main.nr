// passphrase in hex (needed for Field): 0x69206c696b65206e6163686f73
// pedersen hash of passphrase: 0x033787e40b56554b03a980f03a55fbd5baf81cf563a228928b1598d34629bfd5

// test command: nargo test --show-output

use dep::std;

struct Person {
    name: str<3>,
    age: u8
}

global minimumAge: u8 = 18;

fn main(member : Person, passphrase: Field, passphraseHash: pub Field) {
    assert(member.age >= minimumAge);
    let calculatedPassphraseHash = std::hash::pedersen_hash([passphrase,0]);
    assert(calculatedPassphraseHash == passphraseHash);
}

#[test]
fn get_passphrase_hash() {
    let passphrase: Field = 0x69206c696b65206e6163686f73; 
    let passphraseHash = std::hash::pedersen_hash([passphrase,0]);
    println(passphraseHash);
}

#[test]
fn test_main() {
    let passphrase: Field = 0x69206c696b65206e6163686f73; 
    let passphraseHash: Field = 0x033787e40b56554b03a980f03a55fbd5baf81cf563a228928b1598d34629bfd5; 

    let cat = Person {
        name: "Cat", 
        age: 27,
    }; 

    main(cat, passphrase, passphraseHash);
}
