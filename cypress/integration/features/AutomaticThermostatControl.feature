Feature: Automatic Thermostat Control

  Scenario Outline: Automatic switch is on
    Given the automatic switch is set to 'on'
    When the measured temperature is "<temperature>"
    Then the heating should be "<action>"

    Examples:
      | temperature | action |
      | 23°C        | off    |
      | 24°C        | off    |
      | 22.9°C      | on     |
      | 23.1°C      | off    |
      | 15°C        | on     |
      | 30°C        | off    |
      | 22°C        | on     |
      
  Scenario Outline: Automatic switch is off
    Given the automatic switch is set to 'off'
    When the measured temperature is "<temperature>"
    Then the heating should be "<action>"

    Examples:
      | temperature | action |
      | 5°C         | on     |
      | 4.9°C       | on     |
      | 5.1°C       | off    |
      | 10°C        | off    |
      | 0°C         | on     |
      | 6°C         | off    |
      | -3°C        | on     |