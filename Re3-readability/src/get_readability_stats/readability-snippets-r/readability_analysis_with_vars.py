from __future__ import division
import collections
import glob
import json
import os
import re

r_keywords = ['if','else','repeat','while','function','for','in','next','break',\
        'TRUE','FALSE','NULL','Inf','NaN','NA','NA_integer_','NA_real_','NA_complex_',\
            'NA_character_','\.\.\.','\.\.1','\.\.2','\.\.3']

def get_vars(temp):
    # remove spaces and tabs
    temp = temp.replace(" ", "")
    temp = temp.replace('\t', "")

    # match comments starting with #
    # match them and remove them
    temp = re.sub(r'\#.*', "", temp)

    # match strings in the code:
    # match everything between "" and remove it
    temp = temp.replace("'", '"')
    temp = re.sub(r'"[\s\S]*?"','""', temp) 

    # match everything between () (ie atributs in functions) 
    # and remove it
    temp = re.sub(r'\([\s\S]*?\)','()', temp) 

    # match functions:
    # match format aaaa( and remove it 
    temp = re.sub(r'[a-zA-Z][\w|.]*\(','(', temp) 

    # match everything else which might be a var
    likely_vars = re.findall(r'[a-zA-Z][\w.]*', temp)

    return set(likely_vars) - set(r_keywords)
    

def get_readability_metrics(vars, filename=None, all_code=None, test=False):

    if all_code is None:
        print("Error: all_code is None")
        return 

    code_lines = all_code.split('\n')
    line_no = len(code_lines) # no of lines

    loops = 0
    spaces = 0
    commas = 0
    periods = 0
    numbers = 0
    comments = 0
    branches = 0
    line_len = 0
    keywords = 0
    vars_count = 0
    blank_line = 0
    assignments = 0
    max_numbers = 0
    indentation = 0
    parentheses = 0
    max_keywords = 0
    max_line_len = 0 
    max_vars_count = 0
    max_indentation = 0
    max_occurence_of_var = 0
    arithmetic_operators = 0
    comparison_operators = 0
    max_occurrence_of_character = 0

    avg_vars_len = sum(map(len, vars)) / len(vars)
    max_vars_len = max(map(len, vars))
    vars_list = []

    for line in code_lines:
        line_len += len(line)
        max_line_len = max(len(line), max_line_len)

        if (len(line.strip())==0):
            blank_line += 1
            continue

        if '#' in line:
            comments += 1

        indentation += len(line) - len(line.lstrip())
        max_indentation = max(max_indentation, len(line) - len(line.lstrip()))

        numbers_in_line = sum(c.isdigit() for c in line)
        numbers += numbers_in_line
        max_numbers = max(numbers_in_line, max_numbers)

        spaces  += sum(c.isspace() for c in line)
        commas += line.count(',')
        periods += line.count('.')

        loops += len(re.findall(r'(for|while|repeat)(\W|$)', line))
        parentheses += len(re.findall(r'\[|\(|\{|\}|\)|\]', line))
        branches += len(re.findall(r'(else if|if|else)(\W|$)', line))
        arithmetic_operators += len(re.findall(r'\+|-|\*\*|\*|\/|\^|%%|%\/%', line))
        comparison_operators += len(re.findall(r'<|>|==|<=|>=|!=', line))
        assignments += len(re.findall(r'(?<!\!|<|>|=)=|<-|->|<<-|->>', line))

        keywords_count_per_line = len(re.findall(re.compile("|".join(r_keywords)), line))
        keywords += keywords_count_per_line
        max_keywords = max(max_keywords, keywords_count_per_line)

        vars_pattern = re.compile("("+"|".join(vars)+")(\W|$)")

        vars_count_per_line = len(re.findall(vars_pattern, line))
        max_vars_count = max(max_vars_count, vars_count_per_line)
        vars_count += vars_count_per_line

        vars_list.extend(re.findall(vars_pattern, line))

        char, char_count = collections.Counter(line).most_common(1)[0]
        max_occurrence_of_character = max (max_occurrence_of_character, char_count)

    # vars_list is a list of tuples
    vars_list = [i[0] for i in vars_list]
    occurence_count = collections.Counter(vars_list)
    try:
        max_occurence_of_var = occurence_count.most_common(1)[0][1]
    except:
        pass

    metrics_dict = {
                'filename': filename,
                'line_no': line_no,
                'avg_line_len': line_len / line_no,
                'max_line_len': max_line_len,
                'avg_indentation': indentation / line_no,
                'max_indentation': max_indentation,
                'avg_numbers': numbers / line_no,
                'avg_comments': comments / line_no,
                'max_numbers': max_numbers,
                'avg_periods': periods / line_no,
                'avg_commas': commas / line_no,
                'avg_spaces': spaces / line_no,
                'avg_parentheses': parentheses / line_no,
                'avg_arithmetic_operators': arithmetic_operators / line_no,
                'avg_comparison_operators': comparison_operators / line_no,
                'avg_assignments': assignments / line_no,
                'avg_branches': branches / line_no,
                'avg_loops': loops / line_no,
                'avg_keywords': keywords / line_no,
                'max_keywords': max_keywords,
                'avg_blank_lines': blank_line / line_no,
                'max_occurrence_of_character': max_occurrence_of_character,
                'avg_vars_len': avg_vars_len,
                'max_vars_len': max_vars_len,
                'avg_vars_count': vars_count / line_no,
                'max_vars_count': max_vars_count,
                'max_occurence_of_var': max_occurence_of_var,
                'vars': ";".join(vars)
				}

    if test:
        return metrics_dict
    else:
        with open('metrics_with_vars.txt', 'a') as f:
            json.dump(metrics_dict, f)
            f.write(',')
    
list_of_r_files = glob.glob("*.R")
list_of_r_files.extend(glob.glob('*.r'))
print(list_of_r_files)

for r_file in list_of_r_files:

    if r_file and os.path.isfile(r_file):
        all_code = open(r_file, 'r').read()

    all_vars = get_vars(all_code)
    get_readability_metrics(all_vars, filename=r_file, all_code=all_code) 

