from collections import defaultdict, deque

def topo_sort(nodes, edges):
    graph = defaultdict(list)
    indegree = {n["id"]: 0 for n in nodes}

    for e in edges:
        if e["source"] not in indegree or e["target"] not in indegree:
            raise ValueError("Edge references unknown node")

        graph[e["source"]].append(e["target"])
        indegree[e["target"]] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    if len(order) != len(nodes):
        raise ValueError("Cycle detected in workflow")

    return order
