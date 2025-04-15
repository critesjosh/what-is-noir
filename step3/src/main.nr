//  for i in 0..5 {
//        std::println(i);
//    }

fn main(num: u64) -> pub u64 {
    // Safety: this should NOT be used in production
    let square = unsafe { sqrt(num) };
    assert(square * square == num);
    
    square
}

unconstrained fn sqrt(num: u64) -> u64 {
    let mut approx = num;
    let mut better_approx = (approx + 1) / 2;

    for _ in 0..10 { 
        approx = better_approx;
        // if (approx==69) {
        //     break;
        // }
        better_approx = (approx + num / approx) / 2;
    }

    better_approx
}

#[test]
fn test_main() {
    let number_to_square_root: u64 = 144; 
    let square_root = main(number_to_square_root);
    assert(square_root == 12);
}
