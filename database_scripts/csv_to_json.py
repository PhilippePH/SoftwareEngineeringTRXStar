import csv
import json
import os

def csv_to_json(csv_files, json_file):
    
    table_structure =[]
    
    for csv_file in csv_files:
        table_name = os.path.splitext(csv_file)
        
        with open("database_scripts/csv/" + csv_file, 'rb') as f:
            contents = f.read().decode('utf-8-sig')
            f = contents.splitlines()
            reader = csv.reader(f)
            header = next(reader)
            rows = list(reader)
            
            keyPath = header[0]
            
        indexes = []
            
        for h in header:
            if h == keyPath:
                continue
            if h == "muscle_type":
                indexes.append({
                "name": h,
                "keyPath": h,
                "unique": False,
                "multientry": True
                })

            else:
                indexes.append({
                    "name": h,
                    "keyPath": h,
                    "unique": False,
                    "multientry": False
                    })
                    
        data = []
        for row in rows:
            item = {}
            for i, h in enumerate(header):
                if (row[i].isdigit()):
                    item[h] = int(row[i])
                elif(h == 'muscle_type'):
                    lst = row[i].split(',')
                    item[h] = lst
                else:
                    item[h] = row[i]
           #print(item)
            data.append(item)
        #print(data)
                    
                    
        structure = {
            "name": table_name[0],
            "keyPath": keyPath,
            "indexes": indexes,
            "data": data
            }

        table_structure.append(structure)

    schema_structure = {
        "name": "ExerciseDatabase",
        "version": 1,
        "tables": table_structure
    }

    with open("database_scripts/json/" + json_file, 'w') as f:
        json.dump(schema_structure, f, indent=2,
                  separators=(',', ': '), sort_keys=False)

