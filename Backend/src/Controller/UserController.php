<?php

namespace App\Controller;

use App\Entity\User;
use App\Handler\UserHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UserController extends BaseController
{
    private UserHandler $handler;

    function __construct(UserHandler $handler, JWTEncoderInterface $JWTEncoder)
    {
        $this->handler = $handler;
        $this->JWTEncoder = $JWTEncoder;
    }

    #[Route('/api/users', methods: ['POST'])]
    public function create(Request $request)
    {
        return $this->handler->create($request);
    }

    #[Route('/api/users', methods: ['PUT'])]
    public function update(Request $request)
    {
        $user = $this->getCurrentUser($request);

        if(empty($user)) {
            return $this->unauthorizedResponse();
        }

        return $this->handler->update($request, $user);
    }

    #[Route('/api/users', methods: ['GET'])]
    public function getAll()
    {
        return $this->handler->getAll();
    }

    #[Route('/api/users/{id}', methods: ['GET'])]
    public function get($id)
    {
        return $this->handler->get($id);
    }
}
