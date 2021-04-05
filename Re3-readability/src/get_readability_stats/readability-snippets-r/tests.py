import unittest 
from readability_analysis import get_readability_metrics

class SimpleTest(unittest.TestCase): 
  
    # readability analysis
    # simple tests for readability analysis to make sure results are as expected
    def test_avg_commas(self):
        res = get_readability_metrics('a', all_code=",,\n,,", test=True)
        cor = 2.0
        self.assertEqual(res["avg_commas"], cor)

    def test_line_no(self):
        res = get_readability_metrics('a', all_code="a<-2,\n,a+b\n,b\n,", test=True)
        cor = 4.0
        self.assertEqual(res["line_no"], cor)

    def test_avg_line_len(self):
        res = get_readability_metrics('a', all_code="a\naa\n  ,", test=True)
        cor = 2.0
        self.assertEqual(res["avg_line_len"], cor)

        res = get_readability_metrics('a', all_code="a\naaa\n\n\nc", test=True)
        cor = 1.0
        self.assertEqual(res["avg_line_len"], cor)

    def test_max_line_len(self):
        res = get_readability_metrics('a', all_code="a\naa\n  ,", test=True)
        cor = 3.0
        self.assertEqual(res["max_line_len"], cor)

    def test_max_line_len1(self):
        res = get_readability_metrics('a', all_code="a\naaaaa\n\n\nc", test=True)
        cor = 5.0
        self.assertEqual(res["max_line_len"], cor)

        res = get_readability_metrics('a', all_code="\n\n\n\n", test=True)
        cor = 0.0
        self.assertEqual(res["max_line_len"], cor)

    def test_avg_indentation(self):
        res = get_readability_metrics('a', all_code="   a,,\n a,,", test=True)
        cor = 2.0
        self.assertEqual(res["avg_indentation"], cor)

        res = get_readability_metrics('a', all_code="   a,,\n   a,,", test=True)
        cor = 3.0
        self.assertEqual(res["avg_indentation"], cor)

    def test_max_indentation(self):
        res = get_readability_metrics('a', \
            all_code="a\n  aaaaa\n\n\n        c", test=True)
        cor = 8.0
        self.assertEqual(res["max_indentation"], cor)

    def test_avg_numbers(self):
        res = get_readability_metrics('a', all_code="1\n,  3,\n\n\na", test=True)
        cor = 0.4
        self.assertEqual(res["avg_numbers"], cor)

    def test_max_numbers(self):
        res = get_readability_metrics('a', all_code="1\n,\3,\n\n\na", test=True)
        cor = 1
        self.assertEqual(res["max_numbers"], cor)

        res = get_readability_metrics('a', all_code="1029\n,\3,\n\n\na", test=True)
        cor = 4
        self.assertEqual(res["max_numbers"], cor)

    def test_avg_comments(self):
        res = get_readability_metrics('a', all_code="1###\n,  3,#\n\n\na", test=True)
        cor = 0.4
        self.assertEqual(res["avg_comments"], cor)

    def test_avg_comments1(self):
        res = get_readability_metrics('a', all_code="1 #com ##\n#comment", test=True)
        cor = 1
        self.assertEqual(res["avg_comments"], cor)

    def test_avg_spaces(self):
        res = get_readability_metrics('a', all_code="1 #com ##\n#comment", test=True)
        cor = 1
        self.assertEqual(res["avg_spaces"], cor)

        res = get_readability_metrics('a', all_code="1 #com    ##\n#comment", test=True)
        cor = 2.5
        self.assertEqual(res["avg_spaces"], cor)

    def test_max_vars_len(self):
        res = get_readability_metrics('a', all_code="a 1 # a com ##\n#comment", test=True)
        cor = 1
        self.assertEqual(res["max_vars_len"], cor)

    def test_avg_vars_len(self):
        res = get_readability_metrics('a b c', all_code="a 1 # a com ##\n#comment", test=True)
        cor = 1
        self.assertEqual(res["avg_vars_len"], cor)

        
        res = get_readability_metrics('a2 temp c2', all_code="a 1 # a com ##\n#comment", test=True)
        cor = 2.6666666667
        self.assertAlmostEqual(res["avg_vars_len"], cor)

    def test_avg_keywords(self):
        res = get_readability_metrics('a', all_code="a 1 # a com ##\n#comment", test=True)
        cor = 0
        self.assertEqual(res["avg_keywords"], cor)

    def test_avg_keywords1(self):
        res = get_readability_metrics('a', all_code="a 1 if # a com ##\n#comment", test=True)
        cor = 0.5
        self.assertEqual(res["avg_keywords"], cor)

    def test_avg_keywords2(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a com ##\n# while comment", test=True)
        cor = 1
        self.assertEqual(res["avg_keywords"], cor)

    def test_avg_keywords3(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a forinnextbreak ##\n#comment", test=True)
        cor = 2.5
        self.assertEqual(res["avg_keywords"], cor)

    def test_max_keywords(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a forinnextbreak ##\n#comment", test=True)
        cor = 5
        self.assertEqual(res["max_keywords"], cor)

    def test_avg_periods(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a forinnextbreak ##\n#comment", test=True)
        cor = 0
        self.assertEqual(res["avg_periods"], cor)

    def test_avg_periods1(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a forinnextbreak. ##\n#comment\n\n", test=True)
        cor = 0.25
        self.assertEqual(res["avg_periods"], cor)

    def test_avg_parentheses(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a (forinnextbreak). ##\n#comment\n\n", test=True)
        cor = 0.5
        self.assertEqual(res["avg_parentheses"], cor)

    def test_avg_parentheses1(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a [(forinnextbreak).]\{\} ##\n#comment\n\n", test=True)
        cor = 1.5
        self.assertEqual(res["avg_parentheses"], cor)

    def test_avg_loops(self):
        res = get_readability_metrics('a', \
            all_code="a 1 if # a [(for() innextbreak).]\{\} ##\n#comment\n\n", test=True)
        cor = 0.25
        self.assertEqual(res["avg_loops"], cor)

    def test_avg_loops1(self):
        res = get_readability_metrics('a', \
            all_code="for (r_file in r_files){", test=True)
        cor = 1.0
        self.assertEqual(res["avg_loops"], cor)

    def test_max_occurence_of_var1(self):
        res = get_readability_metrics('a i', \
            all_code="for (r_file in r_file){", test=True)
        cor = 0
        self.assertEqual(res["max_occurence_of_var"], cor)

    def test_vars(self):
        res = get_readability_metrics('a i r_file', \
            all_code="for (r_file in r_file){", test=True)
        res = res['vars']
        self.assertTrue('a' in res and 'i' in res and "r_file" in res)
    
    def test_max_occurence_of_var(self):
        res = get_readability_metrics('a r_file', \
            all_code="for a a a a(r_file in r_file){ a", test=True)
        cor = 5
        self.assertEqual(res["max_occurence_of_var"], cor)

    def test_max_occurence_of_var2(self):
        res = get_readability_metrics('r_file', \
            all_code="for (r_file in r_file){", test=True)
        cor = 2
        self.assertEqual(res["max_occurence_of_var"], cor)

    def test_max_vars_count(self):
        res = get_readability_metrics('a i r_file', \
            all_code="for (r_file in r_file){", test=True)
        cor = 2
        self.assertEqual(res["max_vars_count"], cor)

    def test_max_vars_count1(self):
        res = get_readability_metrics('r_file r_text', \
            all_code="a 1 if # a [(for() innextbreak).]\{\} ##\n#comment\n\n", test=True)
        cor = 0
        self.assertEqual(res["max_vars_count"], cor)

    def test_avg_vars_count(self):
        res = get_readability_metrics('a i r_file', \
            all_code="for (r_file in r_file){", test=True)
        cor = 2
        self.assertEqual(res["avg_vars_count"], cor)

    def test_avg_vars_count1(self):
        res = get_readability_metrics('a i r_file', \
            all_code="", test=True)
        cor = 0
        self.assertEqual(res["avg_vars_count"], cor)

    def test_avg_vars_count2(self):
        res = get_readability_metrics('a i r_file', \
            all_code="a i i\n r_file i i\n a i", test=True)
        cor = 2.666666666667
        self.assertAlmostEqual(res["avg_vars_count"], cor)

    def test_avg_blank_lines(self):
        res = get_readability_metrics('a i r_file', \
            all_code="a i i\n r_file i i\n a i", test=True)
        cor = 0
        self.assertEqual(res["avg_blank_lines"], cor)

    def test_avg_blank_lines1(self):
        res = get_readability_metrics('a i r_file', \
            all_code="a i i\n \n\n r_file i i\n a i", test=True)
        cor = 0.4
        self.assertEqual(res["avg_blank_lines"], cor)

    def test_max_occurrence_of_character(self):
        res = get_readability_metrics('a', \
            all_code="a i i\n \n\n r_file i i\n a i", test=True)
        cor = 3
        self.assertEqual(res["max_occurrence_of_character"], cor)

    def test_avg_arithmetic_operators(self):
        res = get_readability_metrics('a', \
            all_code="a i + i\n \n\n r_file == i i\n a i", test=True)
        cor = 0.2
        self.assertEqual(res["avg_arithmetic_operators"], cor)

    def test_avg_arithmetic_operators1(self):
        res = get_readability_metrics('a', \
            all_code="a^b", test=True)
        cor = 1
        self.assertEqual(res["avg_arithmetic_operators"], cor)

    def test_avg_arithmetic_operators2(self):
        res = get_readability_metrics('a', \
            all_code="a%/%b", test=True)
        cor = 1
        self.assertEqual(res["avg_arithmetic_operators"], cor)

    def test_avg_comparison_operators(self):
        res = get_readability_metrics('a', \
            all_code="a i + i\n \n\n r_file == i i\n a i", test=True)
        cor = 0.2
        self.assertEqual(res["avg_comparison_operators"], cor)

    def test_avg_comparison_operators1(self):
        res = get_readability_metrics('a', \
            all_code="a<=b", test=True)
        cor = 1
        self.assertEqual(res["avg_comparison_operators"], cor)

    def test_avg_comparison_operators2(self):
        res = get_readability_metrics('a', \
            all_code="a!=b", test=True)
        cor = 1
        self.assertEqual(res["avg_comparison_operators"], cor)

    def test_avg_assignments(self):
        res = get_readability_metrics('a', \
            all_code="a<- i + i\n \n\n r_file <<-i i\n a i", test=True)
        cor = 0.4
        self.assertEqual(res["avg_assignments"], cor)

    def test_avg_assignments1(self):
        res = get_readability_metrics('a', \
            all_code="a=b", test=True)
        cor = 1
        self.assertEqual(res["avg_assignments"], cor)

    def test_avg_assignments2(self):
        res = get_readability_metrics('a', \
            all_code="a->>b", test=True)
        cor = 1
        self.assertEqual(res["avg_assignments"], cor)

    def test_avg_branches(self):
        res = get_readability_metrics('a', \
            all_code="if a<- i + i\n \n\nelse r_file <<-i i\n a i", test=True)
        cor = 0.4
        self.assertEqual(res["avg_branches"], cor)

    def test_avg_branches1(self):
        res = get_readability_metrics('a', \
            all_code=" if a==b:", test=True)
        cor = 1
        self.assertEqual(res["avg_branches"], cor)

    def test_avg_branches2(self):
        res = get_readability_metrics('a', \
            all_code="if else if else if else", test=True)
        cor = 4
        self.assertEqual(res["avg_branches"], cor)

    def test_avg_branches3(self):
        res = get_readability_metrics('a', \
            all_code="if if if else if else", test=True)
        cor = 5
        self.assertEqual(res["avg_branches"], cor)

if __name__ == '__main__': 
    unittest.main()


