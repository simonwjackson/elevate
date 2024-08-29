Describe 'moonbeam'
  moonlight() {
    # This is our mock function for moonlight
    # It simply returns 0 (success) when called
    return 0
  }

  # Export the function so it's available to subshells
  export -f moonlight

  It 'prints help information'
    When run script ./bin/moonbeam 
    The status should be success
    The output should include 'Usage:'
    # The output should include 'Options:'
    # The error should be blank
  End
End
