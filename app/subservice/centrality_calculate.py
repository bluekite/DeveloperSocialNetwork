import networkx as nx
import json
import math

from operator import itemgetter
# from IPython.display import HTML
# from IPython.core.display import display
# display(HTML('<img src="../../public/images/opengraph.png" width="400px">')) # The classic Krackhardt kite graph
# kkg = nx.generators.small.krackhardt_kite_graph()

d_comment_15_file = file("public/wordpress/network_developer_comment_15.json")
d_comment_15 = json.load(d_comment_15_file)

G=nx.Graph()
# e=[('a','b',0.3),('b','c',0.9),('a','c',0.5),('c','d',1.2)]
# G.add_weighted_edges_from(e)

version = [ 15, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]


e = []
[ e.append( (edge['developer1'], edge['developer2'], edge['count']) )
	for edge in d_comment_15 ]
G.add_weighted_edges_from(e)


# G.add_node("spam")
# G.add_edge(1,2)
# print(G.nodes())
# print(G.edges())

print "Degree Centrality"
print nx.degree_centrality(G).items()
# print sorted(nx.degree_centrality(G).items(),
# key=itemgetter(1), reverse=True)
print
print "Betweenness Centrality"
print nx.betweenness_centrality(G)

print
print "Closeness Centrality"
print nx.closeness_centrality(G)

print "Community Centrality"
print nx.communicability_centrality(G)

print "Load Centrality"
print nx.load_centrality(G)

print "Eigenvector Centrality"
print nx.eigenvector_centrality(G)


