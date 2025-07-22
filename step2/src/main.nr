// passphrase in hex (needed for Field): 0x69206c696b65206e6163686f73
// pedersen hash of passphrase: 0x033787e40b56554b03a980f03a55fbd5baf81cf563a228928b1598d34629bfd5

// test command: nargo test --show-output

use dep::poseidon;
use dep::std;

struct Person {
    name: str<5>,
    age: u8,
}

global minimumAge: u8 = 18;

fn main(member: Person, passphrase: Field, passphraseHash: pub Field) {
    assert(member.age >= minimumAge);
    let calculatedPassphraseHash = poseidon::poseidon2::Poseidon2::hash([passphrase, 0], 1);
    assert(calculatedPassphraseHash == passphraseHash);
}

#[test]
fn get_passphrase_hash() {
    let passphrase: Field = 0x69206c696b65206e6163686f73;
    let passphraseHash = poseidon::poseidon2::Poseidon2::hash([passphrase, 0], 1);
    std::println(passphraseHash);
}

#[test]
fn test_main() {
    let passphrase: Field = 0x69206c696b65206e6163686f73;
    let passphraseHash: Field = 0x0e09d5f0ce509619bc5a58bdc77989a24a3a0b98de930cb6c66cb64051bc1b93;

    let alice = Person { name: "Alice", age: 30 };

    main(alice, passphrase, passphraseHash);
}
