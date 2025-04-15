// passphrase: vamo messi
// passphrase in hex (needed for Field): 0x76616d6f206d65737369
// pedersen hash of passphrase: 0x14c997b9c9300425780034a5f9794492395fd4ac2df88ec203053bf6c129c528

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
    let passphrase: Field = 0x76616d6f206d65737369; // paste this into a hex -> string calculator ;) 
    let passphraseHash = std::hash::pedersen_hash([passphrase,0]);
    println(passphraseHash);
}

#[test]
fn test_main() {
    let passphrase: Field = 0x76616d6f206d65737369; 
    let passphraseHash: Field = 0x14c997b9c9300425780034a5f9794492395fd4ac2df88ec203053bf6c129c528; 

    let cat = Person {
        name: "Cat", 
        age: 26,
    }; 

    main(cat, passphrase, passphraseHash);
}
