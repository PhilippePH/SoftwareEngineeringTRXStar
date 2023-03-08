from csv_to_json import *
from os import listdir
from os.path import isfile, join

csvfiles = [f for f in listdir("database_scripts/csv") if isfile(join("database_scripts/csv", f))]
csv_to_json(csvfiles, "ExerciseDatabase.json")
print("Exercise database generated")
